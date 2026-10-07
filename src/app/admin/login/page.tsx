'use client';

import { Suspense, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import { errorMessage, fieldErrors } from '@/lib/api';
import type { FieldErrors } from '@/types';
import logo from "../../(website)/assets/images/logo.png";


interface LoginFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const { admin, loading, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState<LoginFormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => { if (!loading && admin) router.replace('/admin/dashboard'); }, [loading, admin, router]);
  useEffect(() => { if (params.get('expired')) toast.error('Session expired, please login again', { id: 'expired' }); }, [params]);

  const set = (k: keyof LoginFormValues) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back!');
      router.replace('/admin/dashboard');
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err, 'Login failed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="login">
      <form className="login-box" onSubmit={onSubmit} noValidate>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand" src={logo.src} alt="MVNL Engineering" />
        <h2>Admin Login</h2>
        <div className="fg">
          <label>Email / Username<span className="req">*</span></label>
          <input type="email" autoComplete="username" placeholder="admin@admin.com" value={form.email} onChange={set('email')} className={errors.email ? 'invalid' : ''} />
          {errors.email && <div className="err">{errors.email}</div>}
        </div>
        <div className="fg">
          <label>Password<span className="req">*</span></label>
          <div className="pw">
            <input type={showPw ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" value={form.password} onChange={set('password')} className={errors.password ? 'invalid' : ''} />
            <button type="button" className="pw-eye" onClick={() => setShowPw((v) => !v)}>{showPw ? 'Hide' : 'Show'}</button>
          </div>
          {errors.password && <div className="err">{errors.password}</div>}
        </div>
        <button type="submit" className="btn-p btn-block" disabled={submitting}>{submitting ? 'Signing in...' : 'LOGIN'}</button>
      </form>
    </section>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}
