'use client';

import type { PaginationInfo } from '@/types';

interface PaginationProps {
  pagination: PaginationInfo | null;
  onPage: (page: number) => void;
  limit: number;
  onLimit: (limit: number) => void;
}

export default function Pagination({ pagination, onPage, limit, onLimit }: PaginationProps) {
  if (!pagination) return null;
  const { page, totalPages, total } = pagination;
  const from = total ? (page - 1) * limit + 1 : 0;
  const to = Math.min(page * limit, total);

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p += 1) pages.push(p);

  return (
    <div className="pager">
      <div>
        Show{' '}
        <select value={limit} onChange={(e) => onLimit(Number(e.target.value))} className="inline-select">
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>{' '}
        entries · Showing {from}–{to} of {total}
      </div>
      <div className="pages">
        <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>‹</button>
        {pages.map((p) => (
          <button type="button" key={p} className={p === page ? 'on' : ''} onClick={() => onPage(p)}>{p}</button>
        ))}
        <button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>›</button>
      </div>
    </div>
  );
}
