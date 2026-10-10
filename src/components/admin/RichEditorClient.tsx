
"use client";

import { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Alignment,
  Link,
  BlockQuote,
  SourceEditing,
  GeneralHtmlSupport,
  HorizontalLine,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import type { RichEditorProps } from "./RichEditor";

const FULL_TOOLBAR = [
  "undo",
  "redo",
  "|",
  "heading",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "|",
  "bulletedList",
  "numberedList",
  "|",
  "alignment",
  "|",
  "link",
  "blockQuote",
  "horizontalLine",
  "|",
  "sourceEditing",
];

const SMALL_TOOLBAR = [
  "undo",
  "redo",
  "|",
  "bold",
  "italic",
  "underline",
  "|",
  "link",
  "sourceEditing",
];

const PLUGINS = [
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Alignment,
  Link,
  BlockQuote,
  SourceEditing,
  GeneralHtmlSupport,
  HorizontalLine,
];

function normalizeEmptyHtml(html: string): string {
  if (
    !html ||
    html === "<p>&nbsp;</p>" ||
    html === "<p><br></p>"
  ) {
    return "";
  }

  return html;
}

export default function RichEditorClient({
  value,
  onChange,
  small = false,
  invalid = false,
}: RichEditorProps) {
  const editorRef = useRef<ClassicEditor | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Synchronize external values such as API edit data and form reset.
  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) return;

    // Avoid overwriting source text while source mode is active.
    const sourceEditing = editor.plugins.get(SourceEditing);

    if (sourceEditing.isSourceEditingMode) return;

    const nextValue = normalizeEmptyHtml(value || "");
    const currentValue = normalizeEmptyHtml(editor.getData());

    if (currentValue !== nextValue) {
      editor.setData(nextValue);
    }
  }, [value]);

  return (
    <div
      className={[
        "rich",
        small ? "sm" : "",
        invalid ? "invalid" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          // Replace with a commercial license key if needed.
          licenseKey: "GPL",

          plugins: PLUGINS,

          toolbar: {
            items: small ? SMALL_TOOLBAR : FULL_TOOLBAR,
            shouldNotGroupWhenFull: false,
          },

          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
            ],
          },

          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
          },

          // Retain common styling from source HTML.
          htmlSupport: {
            allow: [
              {
                name: /^(p|div|span|h[1-6]|ul|ol|li|blockquote)$/,
                classes: true,
                styles: true,
                attributes: true,
              },
              {
                name: /^(a|strong|em|b|i|u|s|br|hr)$/,
                classes: true,
                styles: true,
                attributes: true,
              },
            ],
            disallow: [
              { name: /^(script|iframe|object|embed|form)$/ },
              {
                name: /.*/,
                attributes: [/^on/i],
              },
            ],
          },
        }}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(_, editor) => {
          const html = normalizeEmptyHtml(editor.getData());
          onChangeRef.current(html);
        }}
        onAfterDestroy={() => {
          editorRef.current = null;
        }}
      />
    </div>
  );
}
