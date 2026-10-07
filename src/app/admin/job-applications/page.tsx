'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import api, { downloadFile, errorMessage } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { APPLICATION_STATUS } from '@/lib/modules';
import type { ApiResponse, ApplicationStatus, JobApplication, PaginatedData, PaginationInfo } from '@/types';
import useOptions from '@/components/admin/useOptions';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';
import Pagination from '@/components/admin/Pagination';
import Modal, { ConfirmDialog } from '@/components/admin/Modal';

interface Filters {
  search: string;
  careerId: string;
  status: string;
  from: string;
  to: string;
}

const EMPTY: Filters = { search: '', careerId: '', status: '', from: '', to: '' };

export default function JobApplicationsPage() {
  const jobs = useOptions({ endpoint: '/admin/careers', labelKey: 'jobTitle' });
  const [rows, setRows] = useState<JobApplication[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [view, setView] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState('');
  const [viewStatus, setViewStatus] = useState<ApplicationStatus>('new');
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<JobApplication | null>(null);
  const [deleting, setDeleting] = useState(false);

  // debounce the search box, other filters apply immediately
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
      const { data } = await api.get<ApiResponse<PaginatedData<JobApplication>>>('/admin/job-applications', { params: { ...params(), page, limit } });
      setRows(data.data.items);
      setPagination(data.data.pagination);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [params, page, limit]);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const quickStatus = async (row: JobApplication, status: ApplicationStatus) => {
    try {
      const { data } = await api.patch<ApiResponse<JobApplication>>(`/admin/job-applications/${row.id}`, { status });
      setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
      toast.success(data.message);
    } catch (err) { toast.error(errorMessage(err)); }
  };

  const openView = (row: JobApplication) => { setView(row); setNotes(row.adminNotes || ''); setViewStatus(row.status); };

  const saveView = async () => {
    if (!view) return;
    setSaving(true);
    try {
      const { data } = await api.patch<ApiResponse<JobApplication>>(`/admin/job-applications/${view.id}`, { status: viewStatus, adminNotes: notes });
      setRows((list) => list.map((r) => (r.id === view.id ? { ...r, status: viewStatus, adminNotes: notes } : r)));
      toast.success(data.message);
      setView(null);
    } catch (err) { toast.error(errorMessage(err)); } finally { setSaving(false); }
  };

  const resume = async (row: JobApplication | null) => {
    if (!row) return;
    try { await downloadFile(`/admin/job-applications/${row.id}/resume`, `${row.name}_resume`); } catch (err) { toast.error(errorMessage(err, 'Resume not found')); }
  };

  const exportExcel = async () => {
    try { await downloadFile('/admin/job-applications/export', 'job-applications.xlsx', params()); } catch (err) { toast.error(errorMessage(err, 'Export failed')); }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`/admin/job-applications/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      load();
    } catch (err) { toast.error(errorMessage(err)); } finally { setDeleting(false); }
  };

  const detail: Array<[string, string | null | undefined]> = view ? [
    ['Name', view.name], ['Email', view.email], ['Phone', view.phone], ['Job Applied For', view.career?.jobTitle || '—'],
    ['Experience', view.experience], ['Current CTC', view.currentCtc], ['Expected CTC', view.expectedCtc],
    ['Notice Period', view.noticePeriod], ['Portfolio Link', view.portfolioLink], ['Cover Letter', view.coverLetter],
    ['Applied On', formatDate(view.createdAt, true)],
  ] : [];

  return (
    <>
      <PageHeader title="List of Applied Jobs">
        <button type="button" onClick={exportExcel}>⬇ Export Excel</button>
      </PageHeader>

      <div className="card">
        <div className="toolbar">
          <input placeholder="🔍 Search name, email, phone..." value={filters.search} onChange={set('search')} />
          <select value={filters.careerId} onChange={set('careerId')}>
            <option value="">All Jobs</option>
            {jobs.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
          </select>
          <select value={filters.status} onChange={set('status')}>
            <option value="">All Status</option>
            {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="date" value={filters.from} onChange={set('from')} title="From date" className="date-in" />
          <input type="date" value={filters.to} onChange={set('to')} title="To date" className="date-in" />
          <button type="button" onClick={() => setFilters(EMPTY)}>Reset</button>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Applicant Name</th><th>Email</th><th>Phone</th><th>Job Applied For</th>
                <th>Experience</th><th>Resume</th><th>Applied On</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={10}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={10} className="empty">No applications found</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.career?.jobTitle || '—'}</td>
                  <td>{r.experience || '—'}</td>
                  <td><button type="button" className="btn-sm" onClick={() => resume(r)}>⬇ Resume</button></td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>
                    <select className={`inline-select st-${r.status}`} value={r.status} onChange={(e) => quickStatus(r, e.target.value as ApplicationStatus)}>
                      {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="actions">
                    <button type="button" className="btn-sm" onClick={() => openView(r)}>View</button>
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
        title="Applicant Details"
        width={600}
        footer={(
          <>
            <button type="button" onClick={() => resume(view)}>⬇ Download Resume</button>
            <button type="button" onClick={() => setView(null)}>Close</button>
            <button type="button" className="btn-p" onClick={saveView} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </>
        )}
      >
        <div className="kv">
          {detail.map(([k, v]) => (
            <div className="kv-row" key={k}>
              <b>{k}</b>
              <span>{k === 'Portfolio Link' && v ? <a href={v} target="_blank" rel="noreferrer">{v}</a> : (v || '—')}</span>
            </div>
          ))}
        </div>
        <div className="fg">
          <label>Update Status</label>
          <select value={viewStatus} onChange={(e) => setViewStatus(e.target.value as ApplicationStatus)}>
            {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="fg">
          <label>Admin Notes</label>
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes (not visible to applicant)" />
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message="Delete this application and its resume? This action cannot be undone."
      />
    </>
  );
}
