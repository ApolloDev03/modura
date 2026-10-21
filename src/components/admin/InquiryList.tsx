'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import api, { downloadFile, errorMessage } from '@/lib/api';
import { formatDate, stripHtml } from '@/lib/utils';
import PageHeader from './PageHeader';
import Pagination from './Pagination';
import Loader from './Loader';
import Modal, { ConfirmDialog } from './Modal';
import type { ApiResponse, Inquiry, InquiryConfig, PaginatedData, PaginationInfo } from '@/types';

interface Filters {
  search: string;
  from: string;
  to: string;
}

const EMPTY: Filters = { search: '', from: '', to: '' };

/** Read-only list for website inquiries (Contact / Project). */
export default function InquiryList({ config }: { config: InquiryConfig }) {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [view, setView] = useState<Inquiry | null>(null);
  const [toDelete, setToDelete] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setApplied(filters); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [filters]);

  const params = useCallback(
    (): Record<string, string> => Object.fromEntries(Object.entries(applied).filter(([, v]) => v)),
    [applied]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<ApiResponse<PaginatedData<Inquiry>>>(config.endpoint, { params: { ...params(), page, limit } });
      setRows(data.data.items);
      setPagination(data.data.pagination);
      if (data.data.items.length === 0 && page > 1) setPage(page - 1);
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to load inquiries'));
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, params, page, limit]);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLInputElement>) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const exportExcel = async () => {
    try { await downloadFile(`${config.endpoint}/export`, `${config.file}.xlsx`, params()); } catch (err) { toast.error(errorMessage(err, 'Export failed')); }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`${config.endpoint}/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      if (view?.id === toDelete.id) setView(null);
      load();
    } catch (err) { toast.error(errorMessage(err)); } finally { setDeleting(false); }
  };

  const cols = config.columns.length + 3;
  const cell = (v: unknown) => (v === null || v === undefined || v === '' ? '—' : stripHtml(v, 60));
  const text = (v: unknown) => (v === null || v === undefined || v === '' ? '' : String(v));

  return (
    <>
      <PageHeader title={config.title}>
        <button type="button" onClick={exportExcel}>⬇ Export Excel</button>
      </PageHeader>

      <div className="card">
        <div className="toolbar">
          <input placeholder={`🔍 ${config.searchHint}`} value={filters.search} onChange={set('search')} />
          <input type="date" value={filters.from} onChange={set('from')} title="From date" className="date-in" />
          <input type="date" value={filters.to} onChange={set('to')} title="To date" className="date-in" />
          <button type="button" onClick={() => setFilters(EMPTY)}>Reset</button>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                {config.columns.map(([k, label]) => <th key={k}>{label}</th>)}
                <th>Received On</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={cols}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={cols} className="empty">No inquiries found</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  {config.columns.map(([k]) => (
                    <td key={k}>{k === 'email' && r[k] ? <a href={`mailto:${text(r[k])}`}>{text(r[k])}</a> : cell(r[k])}</td>
                  ))}
                  <td>{formatDate(r.createdAt, true)}</td>
                  <td className="actions">
                    <button type="button" className="btn-sm" onClick={() => setView(r)}>View</button>
                    <button type="button" className="btn-sm btn-danger-o" onClick={() => setToDelete(r)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pagination={pagination} limit={limit} onPage={setPage} onLimit={(n) => { setLimit(n); setPage(1); }} />
      </div>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={`${config.singular} Details`}
        width={620}
        footer={(
          <>
            {view?.email && <a className="btn" href={`mailto:${view.email}`}>✉ Reply by Email</a>}
            <button type="button" className="btn-danger-o" onClick={() => setToDelete(view)}>Delete</button>
            <button type="button" className="btn-p" onClick={() => setView(null)}>Close</button>
          </>
        )}
      >
        {view && (
          <div className="kv">
            {config.detail.map(([k, label]) => {
              const v = text(view[k]);
              return (
                <div className="kv-row" key={k}>
                  <b>{label}</b>
                  <span>
                    {k === 'email' && v ? <a href={`mailto:${v}`}>{v}</a>
                      : k === 'phone' && v ? <a href={`tel:${v.replace(/\s+/g, '')}`}>{v}</a>
                        : (v || '—')}
                  </span>
                </div>
              );
            })}
            <div className="kv-row"><b>Received On</b><span>{formatDate(view.createdAt, true)}</span></div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message={`Delete this ${config.singular.toLowerCase()}? This action cannot be undone.`}
      />
    </>
  );
}
