'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="editor-loading">Loading editor…</div>,
});

const FULL_TOOLBAR = [
  [{ header: [2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'blockquote'],
  ['clean'],
];
const SMALL_TOOLBAR = [['bold', 'italic', 'underline'], ['link'], ['clean']];

interface RichEditorProps {
  value: string | null | undefined;
  onChange: (html: string) => void;
  small?: boolean;
  invalid?: boolean;
}

export default function RichEditor({ value, onChange, small = false, invalid = false }: RichEditorProps) {
  return (
    <div className={`rich ${small ? 'sm' : ''} ${invalid ? 'invalid' : ''}`}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={(html: string) => onChange(html === '<p><br></p>' ? '' : html)}
        modules={{ toolbar: small ? SMALL_TOOLBAR : FULL_TOOLBAR }}
      />
    </div>
  );
}
