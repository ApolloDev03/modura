'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useAuth } from '../../lib/auth';
import { NAV } from '../../lib/modules';
import Loader from './Loader';
import logo from "../../app/(website)/assets/images/logo-icon.png";

const titleFor = (pathname: string): string => {
  for (const g of NAV) for (const i of g.items) if (pathname === i.href || pathname.startsWith(`${i.href}/`)) return i.label;
  return 'Admin';
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const { admin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !admin) router.replace('/admin/login');
  }, [loading, admin, router]);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  if (loading || !admin) return <div className="full-center"><Loader text="Loading admin panel..." /></div>;

  const initials = (admin.name || 'A').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="app">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <Link href="/admin/dashboard" className="side-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt="MVNL" />
          <div><b>MVNL</b><small>ENGINEERING</small></div>
        </Link>
        <nav className="nav">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="grp">{g.group}</div>
              {g.items.map((i) => {
                const active = pathname === i.href || pathname.startsWith(`${i.href}/`);
                return <Link key={i.href} href={i.href} className={active ? 'active' : ''}>{i.label}</Link>;
              })}
            </div>
          ))}
        </nav>
      </aside>
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button type="button" className="menu-btn btn-sm" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">☰</button>
            <strong>{titleFor(pathname)}</strong>
          </div>
          <div className={`profile ${profileOpen ? 'open' : ''}`} ref={profileRef}>
            <button type="button" className="profile-btn" onClick={() => setProfileOpen((v) => !v)}>
              <span className="avatar">{initials}</span>
              <span className="hide-sm">{admin.name}</span> ▾
            </button>
            <div className="dd">
              <div className="dd-head">{admin.email}</div>
              <Link href="/admin/change-password">Change Password</Link>
              <button type="button" onClick={logout}>Logout</button>
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
