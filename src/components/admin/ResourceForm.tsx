'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/api';
import { isBlankHtml } from '@/lib/utils';
import FormField, { newAlbum } from './FormField';
import PageHeader from './PageHeader';
import Loader from './Loader';
import type {
  AlbumValue, ApiRecord, ApiResponse, FaqItem, FieldConfig, FieldErrors, FieldValue, FormValues, GalleryImage,
  GalleryValue, InputField, ModuleConfig, PortfolioAlbumRecord,
} from '@/types';

const inputFields = (fields: FieldConfig[]): InputField[] => fields.filter((f): f is InputField => f.type !== 'section');

/** A field with showIf { other: 'value' } is only shown / validated / sent when the other field matches. */
const isVisible = (f: FieldConfig, values: FormValues): boolean =>
  !f.showIf || Object.entries(f.showIf).every(([k, v]) => String(values[k] ?? '') === String(v));

/* narrowing helpers for the FieldValue union */
const galleryOf = (v: FieldValue | undefined): GalleryValue =>
  (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof File) ? v : { existing: [], added: [], removed: [] });
const albumsOf = (v: FieldValue | undefined): AlbumValue[] => (Array.isArray(v) ? (v as AlbumValue[]) : []);
const faqsOf = (v: FieldValue | undefined): FaqItem[] => (Array.isArray(v) ? (v as FaqItem[]) : []);

function emptyValue(f: InputField): FieldValue {
  if (f.type === 'toggle') return typeof f.default === 'boolean' ? f.default : true;
  if (f.type === 'gallery') return { existing: [], added: [], removed: [] };
  if (f.type === 'faqs') return [];
  if (f.type === 'albums') return [newAlbum()];
  if (f.type === 'image' || f.type === 'file') return null;
  return f.default !== undefined ? String(f.default) : '';
}

function fromRecord(f: InputField, record: ApiRecord): FieldValue {
  const v = record[f.name];
  if (f.type === 'toggle') return !!v;
  if (f.type === 'gallery') return { existing: (record.images as GalleryImage[] | undefined) || [], added: [], removed: [] };
  if (f.type === 'faqs') return ((record.faqs as FaqItem[] | undefined) || []).map(({ question, answer }) => ({ question, answer }));
  if (f.type === 'albums') {
    const albums: AlbumValue[] = ((record.albums as PortfolioAlbumRecord[] | undefined) || []).map((a) => ({
      key: `e${a.id}`, id: a.id, title: a.title, existing: a.images || [], added: [], removed: [],
    }));
    return albums.length ? albums : [newAlbum()];
  }
  if (f.type === 'image' || f.type === 'file') return null;
  if ((v === null || v === undefined) && f.default !== undefined) return String(f.default);
  return v === null || v === undefined ? '' : String(v);
}

interface ResourceFormProps {
  moduleKey: string;
  config: ModuleConfig;
  id?: string;
}

export default function ResourceForm({ moduleKey, config, id }: ResourceFormProps) {
  const router = useRouter();
  const isEdit = !!id;
  const fields = inputFields(config.fields);
  const [values, setValues] = useState<FormValues>(() => Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)])));
  const [record, setRecord] = useState<ApiRecord | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;
    let alive = true;
    api.get<ApiResponse<ApiRecord>>(`${config.endpoint}/${id}`)
      .then(({ data }) => {
        if (!alive) return;
        setRecord(data.data);
        setValues(Object.fromEntries(fields.map((f) => [f.name, fromRecord(f, data.data)])));
      })
      .catch((err: unknown) => {
        toast.error(errorMessage(err, 'Record not found'));
        router.replace(`/admin/${moduleKey}`);
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setValue = (name: string, v: FieldValue) => {
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };
  const setFieldError = (name: string, msg: string | null) => setErrors((e) => ({ ...e, [name]: msg || undefined }));

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    for (const f of fields) {
      if (!isVisible(f, values)) continue;
      const v = values[f.name];
      if (f.type === 'albums') {
        const list = albumsOf(v);
        if (f.required && list.length === 0) errs[f.name] = 'Please add at least one album';
        else if (list.some((a) => !a.title.trim())) errs[f.name] = 'Each album needs a title';
        else if (list.some((a) => a.existing.filter((img) => !a.removed.includes(img.id)).length + a.added.length < 1)) {
          errs[f.name] = 'Each album needs at least one image';
        }
        continue;
      }
      if (f.required) {
        if (f.type === 'image' || f.type === 'file') {
          if (!v && !record?.[`${f.name}Url`]) errs[f.name] = `${f.label} is required`;
        } else if (f.type === 'gallery') {
          const g = galleryOf(v);
          const kept = g.existing.filter((img) => !g.removed.includes(img.id)).length;
          if (kept + g.added.length < 1) errs[f.name] = 'Please add at least one image';
        } else if (f.type === 'editor') {
          if (isBlankHtml(v)) errs[f.name] = `${f.label} is required`;
        } else if (String(v ?? '').trim() === '') {
          errs[f.name] = `${f.label} is required`;
        }
      }
      if (f.type === 'url' && v && !/^https?:\/\/\S+$/i.test(String(v))) errs[f.name] = 'Enter a valid URL starting with http:// or https://';
      if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v))) errs[f.name] = 'Enter a valid email address';
      if (f.type === 'faqs' && faqsOf(v).some((r) => (r.question.trim() || r.answer.trim()) && !(r.question.trim() && r.answer.trim()))) {
        errs[f.name] = 'Each FAQ needs both a question and an answer';
      }
    }
    return errs;
  }

  function buildFormData(): FormData {
    const fd = new FormData();
    for (const f of fields) {
      if (!isVisible(f, values)) continue;
      const v = values[f.name];
      switch (f.type) {
        case 'image':
        case 'file':
          if (v instanceof File) fd.append(f.name, v);
          break;
        case 'gallery': {
          const g = galleryOf(v);
          g.added.forEach((file) => fd.append('gallery', file));
          if (isEdit) fd.append('removeImages', JSON.stringify(g.removed));
          break;
        }
        case 'albums': {
          // files of all albums in order; "newImages" tells the API how many belong to each album
          const list = albumsOf(v);
          fd.append('albums', JSON.stringify(list.map((a) => ({
            ...(a.id ? { id: a.id } : {}),
            title: a.title.trim(),
            newImages: a.added.length,
            removeImages: a.removed,
          }))));
          list.forEach((a) => a.added.forEach((file) => fd.append('albumImages', file)));
          break;
        }
        case 'faqs':
          fd.append('faqs', JSON.stringify(faqsOf(v).filter((r) => r.question.trim() && r.answer.trim())));
          break;
        case 'toggle':
          fd.append(f.name, v ? 'true' : 'false');
          break;
        default:
          fd.append(f.name, typeof v === 'string' ? v : '');
      }
    }
    return fd;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error('Please fix the highlighted fields');
      setTimeout(() => document.querySelector('.err')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return;
    }
    setSaving(true);
    try {
      const fd = buildFormData();
      const { data } = isEdit
        ? await api.put<ApiResponse<ApiRecord>>(`${config.endpoint}/${id}`, fd)
        : await api.post<ApiResponse<ApiRecord>>(config.endpoint, fd);
      toast.success(data.message);
      router.push(`/admin/${moduleKey}`);
    } catch (err) {
      const fe = fieldErrors(err);
      if (Object.keys(fe).length) {
        setErrors(fe);
        setTimeout(() => document.querySelector('.err')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      }
      toast.error(errorMessage(err, 'Save failed'));
    } finally {
      setSaving(false);
    }
  }

  const title = `${config.title} › ${isEdit ? 'Edit' : 'Add New'}`;

  return (
    <>
      <PageHeader title={title}>
        <Link href={`/admin/${moduleKey}`} className="btn">← Back to List</Link>
      </PageHeader>
      {loading ? <div className="card"><Loader /></div> : (
        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="grid2">
            {config.fields.filter((f) => isVisible(f, values)).map((f, i) => (
              <FormField
                key={f.name || `sec${i}`}
                field={f}
                value={f.name ? values[f.name] : undefined}
                record={record}
                error={f.name ? errors[f.name] : undefined}
                onChange={(v) => { if (f.name) setValue(f.name, v); }}
                setError={(msg) => { if (f.name) setFieldError(f.name, msg); }}
              />
            ))}
          </div>
          <div className="form-actions">
            <Link href={`/admin/${moduleKey}`} className="btn">Cancel</Link>
            <button type="submit" className="btn-p" disabled={saving}>{saving ? 'Saving...' : isEdit ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}
    </>
  );
}
