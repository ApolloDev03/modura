'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { APPLICATION_STATUS } from '@/lib/modules';
import PageHeader from '../../../components/admin/PageHeader';
import Loader from '../../../components/admin/Loader';
import type { ApiResponse, DashboardData } from '@/types';

const QUICK: Array<[string, string]> = [
  ['/services/new', '+ Service'], ['/portfolios/new', '+ Portfolio'], ['/blogs/new', '+ Blog'],
  ['/careers/new', '+ Career'], ['/testimonials/new', '+ Testimonial'], ['/seo', 'SEO Setup'],
];

/** [icon, label, value, link, optional pill text] */
type StatCard = [string, string, number, string, string | null | undefined];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get<ApiResponse<DashboardData>>('/admin/dashboard')
      .then(({ data: res }) => setData(res.data))
      .catch((err: unknown) => toast.error(errorMessage(err, 'Failed to load dashboard')));
  }, []);

  if (!data) return <><PageHeader title="Dashboard" /><div className="card"><Loader /></div></>;

  const { counts } = data;
  const stats: StatCard[] = [
    ['▦', 'Services', counts.services, '/admin/services', null],
    ['◧', 'Portfolio Items', counts.portfolios, '/admin/portfolios', null],
    ['✎', 'Blog Posts', counts.blogs, '/admin/blogs', null],
    ['✉', 'Job Applications', counts.applications, '/admin/job-applications', counts.newApplications ? `${counts.newApplications} new` : null],
    ['☎', 'Contact Inquiries', counts.contactInquiries, '/admin/contact-inquiries', counts.newContactInquiries ? `${counts.newContactInquiries} this week` : null],
    ['◈', 'Project Inquiries', counts.projectInquiries, '/admin/project-inquiries', counts.newProjectInquiries ? `${counts.newProjectInquiries} this week` : null],
  ];

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="stats">
        {stats.map(([icon, label, value, href, extra]) => (
          <Link href={href} className="stat" key={label}>
            <div className="ic">{icon}</div>
            <div><b>{value}</b>{label}{extra && <em className="new-pill">{extra}</em>}</div>
          </Link>
        ))}
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Recent Job Applications</h3>
          <div className="tbl-wrap">
            <table className="tbl-min">
              <thead><tr><th>Name</th><th>Job</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {data.recentApplications.length === 0 && <tr><td colSpan={4} className="empty">No applications yet</td></tr>}
                {data.recentApplications.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.career?.jobTitle || '—'}</td>
                    <td><span className={`badge st-${a.status}`}>{APPLICATION_STATUS.find((s) => s.value === a.status)?.label}</span></td>
                    <td>{formatDate(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="more"><Link href="/job-applications">View all →</Link></p>
        </div>

        <div className="card">
          <h3>Quick Links</h3>
          <div className="quick">{QUICK.map(([href, label]) => <Link key={href} href={href} className="btn">{label}</Link>)}</div>
          <h3 style={{ marginTop: 20 }}>Recent Blog Posts</h3>
          {data.recentBlogs.length === 0 && <p className="hint">No blog posts yet</p>}
          {data.recentBlogs.map((b) => (
            <div className="row-between list-line" key={b.id}>
              <Link href={`/blogs/${b.id}`}>{b.title}</Link>
              <span className={`badge ${b.status === 'published' ? '' : 'off'}`}>{b.status === 'published' ? 'Published' : 'Draft'}</span>
            </div>
          ))}
          <p className="more small">Active job openings: <b>{counts.activeJobs}</b></p>
        </div>
      </div>
    </>
  );
}
