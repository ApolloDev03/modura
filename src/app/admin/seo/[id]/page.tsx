'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/api';
import type { ApiResponse, FieldErrors, InputField, SeoPage } from '@/types';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';
import FormField from '@/components/admin/FormField';

const FIELDS: InputField[] = [
  { name: 'pageName', label: 'Page Name', type: 'text', required: true, full: true, maxLength: 150 },
  { name: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 255 },
  { name: 'metaKeyword', label: 'Meta Keyword', type: 'text', maxLength: 500 },
  { name: 'metaDescription', label: 'Meta Description', type: 'editor', small: true, full: true },
  { name: 'headScript', label: 'Head', type: 'code', hint: 'Scripts / tags injected inside <head> (e.g. Google Analytics)' },
  { name: 'bodyScript', label: 'Body', type: 'code', hint: 'Scripts injected at start of <body> (e.g. GTM noscript)' },
];

type SeoValues = Record<string, string>;

export default function SeoEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [values, setValues] = useState<SeoValues | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<ApiResponse<SeoPage>>(`/admin/seo/${id}`)
      .then(({ data }) => setValues(Object.fromEntries(FIELDS.map((f) => [f.name, String(data.data[f.name] ?? '')]))))
      .catch((err: unknown) => { toast.error(errorMessage(err, 'Page not found')); router.replace('/seo'); });
  }, [id, router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values) return;
    if (!String(values.pageName).trim()) { setErrors({ pageName: 'Page Name is required' }); return; }
    setSaving(true);
    try {
      const { data } = await api.put<ApiResponse<SeoPage>>(`/admin/seo/${id}`, values);
      toast.success(data.message);
      router.push('/seo');
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err));
    } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader title="SEO Setup › Edit Page SEO" crumb="SEO Setup">
        <Link href="/seo" className="btn">← Back to List</Link>
      </PageHeader>
      {!values ? <div className="card"><Loader /></div> : (
        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="grid2">
            {FIELDS.map((f) => (
              <FormField
                key={f.name}
                field={f}
                value={values[f.name]}
                error={errors[f.name]}
                onChange={(v) => {
                  setValues((s) => (s ? { ...s, [f.name]: typeof v === 'string' ? v : '' } : s));
                  setErrors((x) => ({ ...x, [f.name]: undefined }));
                }}
                setError={() => {}}
              />
            ))}
          </div>
          <div className="form-actions">
            <Link href="/seo" className="btn">Cancel</Link>
            <button type="submit" className="btn-p" disabled={saving}>{saving ? 'Saving...' : 'Update'}</button>
          </div>
        </form>
      )}
    </>
  );
}
