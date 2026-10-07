'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { ApiResponse, SeoPage } from '@/types';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';

export default function SeoListPage() {
  const [rows, setRows] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      api.get<ApiResponse<SeoPage[]>>('/admin/seo', { params: { search: search.trim() || undefined } })
        .then(({ data }) => setRows(data.data))
        .catch((err: unknown) => toast.error(errorMessage(err)))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <>
      <PageHeader title="SEO Setup" />
      <div className="card">
        <p className="hint" style={{ marginBottom: 10 }}>Pages are fixed. You can only edit the SEO settings of each page.</p>
        <div className="toolbar">
          <input placeholder="🔍 Search page..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="button" onClick={() => setSearch('')}>Reset</button>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th style={{ width: 50 }}>#</th><th>Page Name</th><th>Meta Title</th><th>Last Updated</th><th style={{ width: 100 }}>Actions</th></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={5}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={5} className="empty">No pages found. Run <code>npm run seed</code> in the backend.</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td>{r.pageName}</td>
                  <td>{r.metaTitle || '—'}</td>
                  <td>{formatDate(r.updatedAt, true)}</td>
                  <td><Link href={`/seo/${r.id}`} className="btn btn-sm btn-p">✎ Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
