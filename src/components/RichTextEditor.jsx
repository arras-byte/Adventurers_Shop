import React, { useRef, useMemo, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { base44 } from '@/api/base44Client';
import { ImagePlus, Loader2 } from 'lucide-react';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);
  const [uploading, setUploading] = React.useState(false);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const range = editor.getSelection(true) || { index: editor.getLength(), length: 0 };
          editor.insertEmbed(range.index, 'image', file_url);
          editor.setSelection(range.index + 1, 0);
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setUploading(false);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'link'],
          ['clean'],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [handleImageUpload]
  );

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'blockquote', 'link', 'image',
  ];

  return (
    <div className="relative">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write your scroll… paste content directly from Steam or any website — images and formatting are preserved automatically.'}
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        {uploading && (
          <span className="flex items-center gap-1.5 text-xs text-[#5C4A3E] bg-[#F4EBD0]/90 px-2.5 py-1 rounded">
            <Loader2 className="w-3 h-3 animate-spin" /> Uploading…
          </span>
        )}
        <button
          type="button"
          onClick={handleImageUpload}
          className="flex items-center gap-1.5 text-xs text-[#2D241E] bg-[#C89116]/15 hover:bg-[#C89116]/25 px-2.5 py-1 rounded transition-colors"
        >
          <ImagePlus className="w-3.5 h-3.5" /> Upload Image
        </button>
      </div>
    </div>
  );
}