'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/api';
import Modal from './Modal';
import { Gallery } from './FormField';
import type { ApiRecord, ApiResponse, FieldErrors, GalleryValue, PortfolioAlbumRecord } from '@/types';

const EMPTY: GalleryValue = { existing: [], added: [], removed: [] };

interface AddAlbumModalProps {
  portfolio: ApiRecord | null;
  onClose: () => void;
  onSaved?: () => void;
}

/**
 * "+" action in Manage Portfolio list (album type only).
 * Adds one more album (title + multiple images) directly, without opening the edit page.
 */
export default function AddAlbumModal({ portfolio, onClose, onSaved }: AddAlbumModalProps) {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<GalleryValue>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (portfolio) { setTitle(''); setImages(EMPTY); setErrors({}); }
  }, [portfolio]);

  async function save() {
    if (!portfolio) return;
    const errs: FieldErrors = {};
    if (!title.trim()) errs.title = 'Album title is required';
    if (!images.added.length) errs.images = 'Please add at least one image';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      images.added.forEach((f) => fd.append('images', f));
      const { data } = await api.post<ApiResponse<PortfolioAlbumRecord>>(`/admin/portfolios/${portfolio.id}/albums`, fd);
      toast.success(data.message);
      onSaved?.();
      onClose();
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err, 'Could not add album'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={!!portfolio}
      onClose={saving ? undefined : onClose}
      title={`Add Album · ${String(portfolio?.title ?? '')}`}
      width={640}
      footer={(
        <>
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="button" className="btn-p" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Album'}</button>
        </>
      )}
    >
      <div className="fg">
        <label>Album Title<span className="req">*</span></label>
        <input
          className={errors.title ? 'invalid' : ''}
          placeholder="e.g. Interior"
          maxLength={200}
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((x) => ({ ...x, title: undefined })); }}
          autoFocus
        />
        {errors.title && <div className="err">{errors.title}</div>}
      </div>
      <div className="fg">
        <label>Album Images (multiple)<span className="req">*</span></label>
        <Gallery
          value={images}
          max={30}
          coverLabel=""
          invalid={!!errors.images}
          onError={(msg) => setErrors((x) => ({ ...x, images: msg || undefined }))}
          onChange={(v) => { setImages(v); setErrors((x) => ({ ...x, images: undefined })); }}
        />
        {errors.images && <div className="err">{errors.images}</div>}
      </div>
    </Modal>
  );
}
