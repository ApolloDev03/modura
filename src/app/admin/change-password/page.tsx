'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/api';
import type { ApiResponse, FieldErrors } from '@/types';
import PageHeader from '@/components/admin/PageHeader';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const FIELDS: Array<[keyof PasswordForm, string]> = [
  ['currentPassword', 'Current Password'],
  ['newPassword', 'New Password'],
  ['confirmPassword', 'Confirm New Password'],
];
const EMPTY: PasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState<PasswordForm>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!form.currentPassword) errs.currentPassword = 'Current password is required';
    if (!form.newPassword) errs.newPassword = 'New password is required';
    else if (!RULE.test(form.newPassword)) errs.newPassword = 'Min 8 characters with 1 uppercase, 1 number and 1 special character';
    if (form.newPassword && form.confirmPassword !== form.newPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const { data } = await api.put<ApiResponse<null>>('/admin/auth/change-password', form);
      toast.success(data.message);
      setForm(EMPTY);
      router.push('/dashboard');
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err));
    } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader title="Change Password" />
      <form className="card narrow" onSubmit={onSubmit} noValidate>
        {FIELDS.map(([k, label]) => (
          <div className="fg" key={k}>
            <label>{label}<span className="req">*</span></label>
            <input
              type="password"
              autoComplete={k === 'currentPassword' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={form[k]}
              className={errors[k] ? 'invalid' : ''}
              onChange={(e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: undefined })); }}
            />
            {errors[k] && <div className="err">{errors[k]}</div>}
          </div>
        ))}
        <p className="hint">Min 8 characters, 1 uppercase, 1 number, 1 special character</p>
        <div className="form-actions">
          <button type="button" onClick={() => router.push('/dashboard')}>Cancel</button>
          <button type="submit" className="btn-p" disabled={saving}>{saving ? 'Updating...' : 'Update Password'}</button>
        </div>
      </form>
    </>
  );
}
