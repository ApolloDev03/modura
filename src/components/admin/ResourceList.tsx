'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/api';
import { formatDate, getPath, stripHtml } from '@/lib/utils';
import PageHeader from './PageHeader';
import Pagination from './Pagination';
import Loader from './Loader';
import { ConfirmDialog } from './Modal';
import useOptions from './useOptions';
import AddAlbumModal from './AddAlbumModal';
import type {
  ApiRecord, ApiResponse, ColumnConfig, FilterConfig, ModuleConfig, PaginatedData, PaginationInfo, RowAction,
} from '@/types';

/** Extra row actions configured per module (lib/modules.ts → rowActions). */
const actionVisible = (action: RowAction, row: ApiRecord): boolean =>
  !action.showIf || Object.entries(action.showIf).every(([k, v]) => row[k] === v);

function FilterSelect({ filter, value, onChange }: { filter: FilterConfig; value?: string; onChange: (v: string) => void }) {
  const apiOptions = useOptions(filter.optionsFrom);
  const options = filter.options || apiOptions;
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">{filter.label}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Cell({ col, row, onToggle }: { col: ColumnConfig; row: ApiRecord; onToggle: (row: ApiRecord) => void }) {
  const raw = getPath(row, col.key);
  switch (col.type) {
    case 'image': {
      const url = col.key.endsWith('Url') ? raw : getPath(row, `${col.key}Url`);
      if (!url || typeof url !== 'string') return <span className="no-img">—</span>;
      if (/\.pdf($|\?)/i.test(url)) return <a className="pdf-chip" href={url} target="_blank" rel="noreferrer">PDF</a>;
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="cell-img" src={url} alt="" />;
    }
    case 'status':
      return (
        <button type="button" className={`badge ${raw ? '' : 'off'}`} onClick={() => onToggle(row)} title="Click to change status">
          {raw ? 'Active' : 'Inactive'}
        </button>
      );
    case 'enum': {
      const label = col.options?.find((o) => o.value === raw)?.label || (raw ? String(raw) : '—');
      return col.badge ? <span className={`badge ${raw === 'published' ? '' : 'off'}`}>{label}</span> : <>{label}</>;
    }
    case 'date':
      return <>{formatDate(raw)}</>;
    case 'star':
      return raw ? <span className="star">★</span> : <>—</>;
    case 'rating':
      return <>{raw ? '★'.repeat(Number(raw)) : '—'}</>;
    default:
      return <>{raw === null || raw === undefined || raw === '' ? '—' : stripHtml(raw, 70)}</>;
  }
}

interface ResourceListProps {
  moduleKey: string;
  config: ModuleConfig;
}

export default function ResourceList({ moduleKey, config }: ResourceListProps) {
  const [rows, setRows] = useState<ApiRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [status, setStatus] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<ApiRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [albumFor, setAlbumFor] = useState<ApiRecord | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search.trim()); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | undefined> = { page, limit, search: debounced || undefined, status: status || undefined };
      Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
      const { data } = await api.get<ApiResponse<PaginatedData<ApiRecord>>>(config.endpoint, { params });
      setRows(data.data.items);
      setPagination(data.data.pagination);
      if (data.data.items.length === 0 && page > 1) setPage(page - 1);
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to load records'));
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, page, limit, debounced, status, filters]);

  useEffect(() => { load(); }, [load]);

  const setFilter = (name: string, value: string) => { setFilters((f) => ({ ...f, [name]: value })); setPage(1); };

  const reset = () => { setSearch(''); setDebounced(''); setStatus(''); setFilters({}); setPage(1); };

  const toggleStatus = async (row: ApiRecord) => {
    try {
      const { data } = await api.patch<ApiResponse<{ id: number; status: boolean }>>(`${config.endpoint}/${row.id}/status`);
      setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status: data.data.status } : r)));
      toast.success(data.message);
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`${config.endpoint}/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const colCount = config.columns.length + 2;

  return (
    <>
      <PageHeader title={config.title}>
        <Link href={`/admin/${moduleKey}/new`} className="btn btn-p">+ Add New</Link>
      </PageHeader>

      <div className="card">
        {config.tabs && (
          <div className="tabs">
            {config.tabs.options.map((t) => (
              <button
                type="button"
                key={t.value}
                className={(filters[config.tabs!.name] || '') === t.value ? 'on' : ''}
                onClick={() => setFilter(config.tabs!.name, t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="toolbar">
          <input placeholder="🔍 Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          {!config.noStatusFilter && (
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          )}
          {(config.filters || []).map((f) => (
            <FilterSelect key={f.name} filter={f} value={filters[f.name]} onChange={(v) => setFilter(f.name, v)} />
          ))}
          <button type="button" onClick={reset}>Reset</button>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                {config.columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th style={{ width: config.rowActions ? 180 : 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={colCount}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={colCount} className="empty">No records found</td></tr>}
              {!loading && rows.map((row, i) => (
                <tr key={row.id}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  {config.columns.map((c) => <td key={c.key}><Cell col={c} row={row} onToggle={toggleStatus} /></td>)}
                  <td className="actions">
                    {(config.rowActions || []).filter((a) => actionVisible(a, row)).map((a) => (
                      a.type === 'addAlbum' && (
                        <button key={a.type} type="button" className="btn-sm btn-plus" title="Add new album" aria-label="Add new album" onClick={() => setAlbumFor(row)}>＋</button>
                      )
                    ))}
                    <Link href={`/admin/${moduleKey}/${row.id}`} className="btn btn-sm">Edit</Link>
                    <button type="button" className="btn-sm btn-danger-o" onClick={() => setToDelete(row)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination pagination={pagination} limit={limit} onPage={setPage} onLimit={(n) => { setLimit(n); setPage(1); }} />
      </div>

      <AddAlbumModal portfolio={albumFor} onClose={() => setAlbumFor(null)} onSaved={load} />

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${config.singular.toLowerCase()}? This action cannot be undone.`}
      />
    </>
  );
}
