'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import RichEditor from './RichEditor';
import useOptions from './useOptions';
import { IMAGE_ACCEPT, MAX_IMAGE_MB, checkImage } from '@/lib/utils';
import type { AlbumValue, ApiRecord, FaqItem, FieldConfig, FieldValue, GalleryValue, InputField } from '@/types';

type ErrorSetter = (msg: string | null) => void;

/* ---------------- Single image / file upload with preview ---------------- */
interface UploadProps {
  value: File | null;
  existingUrl?: string | null;
  onChange: (file: File) => void;
  onError: ErrorSetter;
  allowPdf?: boolean;
  invalid?: boolean;
}

function Upload({ value, existingUrl, onChange, onError, allowPdf = false, invalid }: UploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const preview = useMemo(() => (value instanceof File ? URL.createObjectURL(value) : null), [value]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pick = (file: File | undefined) => {
    if (!file) return;
    const err = checkImage(file, { allowPdf });
    if (err) { onError(err); return; }
    onError(null);
    onChange(file);
  };

  const shownUrl = preview || existingUrl;
  const isPdf = value instanceof File ? value.type === 'application/pdf' : /\.pdf($|\?)/i.test(existingUrl || '');

  return (
    <div className="upload-wrap">
      <div
        className={`upload ${drag ? 'drag' : ''} ${invalid ? 'invalid' : ''}`}
        onClick={() => input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
        role="button"
        tabIndex={0}
      >
        <b>⬆ Drag &amp; drop or click to upload {allowPdf ? 'file' : 'image'}</b>
        <span>Single {allowPdf ? 'file' : 'image'} only · jpg, jpeg, png, webp{allowPdf ? ', pdf' : ''} · max {MAX_IMAGE_MB} MB</span>
        <input
          ref={input}
          type="file"
          hidden
          accept={allowPdf ? `${IMAGE_ACCEPT},.pdf` : IMAGE_ACCEPT}
          onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }}
        />
      </div>
      {shownUrl && (
        <div className="thumbs">
          <div className="thumb">
            {isPdf
              ? <a href={shownUrl} target="_blank" rel="noreferrer" className="pdf-chip">PDF</a>
              // eslint-disable-next-line @next/next/no-img-element
              : <img src={shownUrl} alt="preview" />}
            <small>{value instanceof File ? 'New' : 'Current'}</small>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Multiple images (portfolio gallery / album images) ---------------- */
interface GalleryProps {
  value: GalleryValue | null | undefined;
  onChange: (value: GalleryValue) => void;
  onError: ErrorSetter;
  invalid?: boolean;
  max?: number;
  coverLabel?: string;
}

export function Gallery({ value, onChange, onError, invalid, max = 20, coverLabel = 'Cover' }: GalleryProps) {
  const input = useRef<HTMLInputElement>(null);
  const { existing = [], added = [], removed = [] } = value || {};
  const previews = useMemo(() => added.map((f) => URL.createObjectURL(f)), [added]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p)), [previews]);

  const addFiles = (list: FileList | null | undefined) => {
    const files = Array.from(list || []);
    const bad = files.map((f) => checkImage(f)).find(Boolean);
    if (bad) { onError(bad); return; }
    onError(null);
   onChange({ existing, removed, added: files.slice(0, 1) });
  };

  const kept = existing.filter((img) => !removed.includes(img.id));

  return (
    <div className="upload-wrap">
      <div
        className={`upload ${invalid ? 'invalid' : ''}`}
        onClick={() => input.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
      >
       <b>⬆ Drag &amp; drop or click to add image</b>
        <span>Single image · jpg, jpeg, png, webp · max {MAX_IMAGE_MB} MB</span>
        <input ref={input} type="file" hidden accept={IMAGE_ACCEPT} onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
      </div>
      {(kept.length > 0 || added.length > 0) && (
        <div className="thumbs">
          {kept.map((img, i) => (
            <div className="thumb" key={`e${img.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.imageUrl} alt="" />
              {i === 0 && coverLabel && <small className="cover">{coverLabel}</small>}
              <button type="button" className="rm" onClick={() => onChange({ existing, added, removed: [...removed, img.id] })} title="Remove">✕</button>
            </div>
          ))}
          {added.map((f, i) => (
            <div className="thumb" key={`n${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previews[i]} alt="" />
              <small>New</small>
              <button type="button" className="rm" onClick={() => onChange({ existing, removed, added: added.filter((_, x) => x !== i) })} title="Remove">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Portfolio albums: repeatable title + multiple images ---------------- */
export const newAlbum = (): AlbumValue => ({
  key: `n${Date.now()}${Math.random().toString(36).slice(2, 6)}`, id: null, title: '', existing: [], added: [], removed: [],
});

interface AlbumRepeaterProps {
  value: AlbumValue[];
  onChange: (value: AlbumValue[]) => void;
  onError: ErrorSetter;
  invalid?: boolean;
}

function AlbumRepeater({ value = [], onChange, onError, invalid }: AlbumRepeaterProps) {
  const update = (i: number, patch: Partial<AlbumValue>) => onChange(value.map((a, x) => (x === i ? { ...a, ...patch } : a)));
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className={`repeater albums ${invalid ? 'invalid' : ''}`}>
      {value.length === 0 && <p className="hint">No albums added yet. Click “+ Add Album”.</p>}
      {value.map((album, i) => (
        <div className="album-item" key={album.key}>
          <div className="album-head">
            <b>Album {i + 1}</b>
            <div className="album-tools">
              <button type="button" className="btn-sm" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">↑</button>
              <button type="button" className="btn-sm" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="Move down">↓</button>
              <button type="button" className="btn-sm btn-danger-o" onClick={() => onChange(value.filter((_, x) => x !== i))}>Remove album</button>
            </div>
          </div>
          <label>Title<span className="req">*</span></label>
          <input
            placeholder="e.g. Ground floor"
            maxLength={200}
            value={album.title}
            onChange={(e) => update(i, { title: e.target.value })}
          />
          <label className="mt">Images<span className="req">*</span></label>
          <Gallery
            value={album}
            max={30}
            coverLabel={i === 0 ? 'Cover' : ''}
            onError={onError}
            onChange={(g) => update(i, { existing: g.existing, added: g.added, removed: g.removed })}
          />
        </div>
      ))}
      <button type="button" className="btn-sm" onClick={() => onChange([...value, newAlbum()])}>+ Add Album</button>
    </div>
  );
}

/* ---------------- FAQ repeater (services / software) ---------------- */
function FaqRepeater({ value = [], onChange }: { value: FaqItem[]; onChange: (value: FaqItem[]) => void }) {
  const update = (i: number, key: keyof FaqItem, v: string) => onChange(value.map((row, x) => (x === i ? { ...row, [key]: v } : row)));
  return (
    <div className="repeater">
      {value.length === 0 && <p className="hint">No FAQs added yet.</p>}
      {value.map((row, i) => (
        <div className="rep-item" key={i}>
          <input placeholder="Question" value={row.question} onChange={(e) => update(i, 'question', e.target.value)} />
          <textarea placeholder="Answer" rows={2} value={row.answer} onChange={(e) => update(i, 'answer', e.target.value)} />
          <button type="button" className="btn-sm" onClick={() => onChange(value.filter((_, x) => x !== i))} title="Remove">✕</button>
        </div>
      ))}
      <button type="button" className="btn-sm" onClick={() => onChange([...value, { question: '', answer: '' }])}>+ Add FAQ</button>
    </div>
  );
}

/* ---------------- Toggle ---------------- */
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

export function Toggle({ checked, onChange, onLabel = 'Active', offLabel = 'Inactive' }: ToggleProps) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <i />
      <span>{checked ? onLabel : offLabel}</span>
    </label>
  );
}

/* ---------------- Select with static or API options ---------------- */
function SelectField({ field, value, onChange, invalid }: { field: InputField; value: string; onChange: (v: string) => void; invalid: boolean }) {
  const apiOptions = useOptions(field.optionsFrom);
  const options = field.options || apiOptions;
  return (
    <select className={invalid ? 'invalid' : ''} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
      {!field.default && <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

/* ---------------- Value helpers (FieldValue is a union – narrow it per field type) ---------------- */
const asString = (v: FieldValue | undefined): string => (typeof v === 'string' ? v : '');
const asFile = (v: FieldValue | undefined): File | null => (v instanceof File ? v : null);
const asGallery = (v: FieldValue | undefined): GalleryValue | null =>
  (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof File) ? v : null);
const asArray = <T,>(v: FieldValue | undefined): T[] => (Array.isArray(v) ? (v as T[]) : []);

/* ---------------- Field wrapper ---------------- */
interface FormFieldProps {
  field: FieldConfig;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
  error?: string;
  setError: ErrorSetter;
  record?: ApiRecord | null;
}

export default function FormField({ field, value, onChange, error, setError, record }: FormFieldProps) {
  if (field.type === 'section') {
    return <div className="sec">{field.label} {field.note && <span>{field.note}</span>}</div>;
  }

  const invalid = !!error;
  const text = asString(value);
  const common = {
    value: text,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: invalid ? 'invalid' : '',
  };
  let control: ReactNode;

  switch (field.type) {
    case 'textarea':
      control = <textarea rows={4} placeholder="Enter text..." {...common} />;
      break;
    case 'code':
      control = <textarea rows={5} className={`code ${invalid ? 'invalid' : ''}`} placeholder="<script> ... </script>" value={text} onChange={(e) => onChange(e.target.value)} spellCheck={false} />;
      break;
 case "editor":
  control = (
    <RichEditor
      value={text}
      onChange={(html: string) => onChange(html)}
      small={field.small ?? false}
      invalid={invalid}
    />
  );
  break;
  break;
    case 'select':
      control = <SelectField field={field} value={text} onChange={onChange} invalid={invalid} />;
      break;
    case 'toggle':
      control = <Toggle checked={value === true} onChange={onChange} onLabel={field.onLabel} offLabel={field.offLabel} />;
      break;
    case 'image':
    case 'file': {
      const existingUrl = record?.[`${field.name}Url`];
      control = (
        <Upload
          value={asFile(value)}
          existingUrl={typeof existingUrl === 'string' ? existingUrl : null}
          onChange={onChange}
          onError={setError}
          allowPdf={field.type === 'file'}
          invalid={invalid}
        />
      );
      break;
    }
    case 'gallery':
      control = <Gallery value={asGallery(value)} onChange={onChange} onError={setError} invalid={invalid} />;
      break;
    case 'albums':
      control = <AlbumRepeater value={asArray<AlbumValue>(value)} onChange={onChange} onError={setError} invalid={invalid} />;
      break;
    case 'faqs':
      control = <FaqRepeater value={asArray<FaqItem>(value)} onChange={onChange} />;
      break;
    case 'number':
      control = <input type="number" min={0} placeholder={field.placeholder || field.label} {...common} />;
      break;
    default:
      control = (
        <input
          type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
          placeholder={field.placeholder || field.label}
          maxLength={field.maxLength}
          {...common}
        />
      );
  }

  return (
    <div className={field.full ? 'full' : ''}>
      <label>
        {field.label}
        {field.required && <span className="req">*</span>}
        {field.optional && <span className="opt">(optional)</span>}
      </label>
      {control}
      {field.hint && !error && <div className="hint">{field.hint}</div>}
      {error && <div className="err">{error}</div>}
    </div>
  );
}
