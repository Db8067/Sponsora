'use client';

import React, { useRef, useState } from 'react';
import { CheckCircle2, Loader2, UploadCloud, X, ImagePlus, RefreshCw, AlertCircle } from 'lucide-react';

export type LogoState = {
  previewUrl: string;
  uploadedUrl: string;
  status: 'idle' | 'uploading' | 'done' | 'error';
  progress: number;
  error: string;
  fileName: string;
  sizeLabel: string;
};

export const EMPTY_LOGO: LogoState = {
  previewUrl: '', uploadedUrl: '', status: 'idle', progress: 0, error: '', fileName: '', sizeLabel: '',
};

const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

/** Shrinks big images in the browser (max 800px, webp) so uploads are fast & small. */
async function compress(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  try {
    const bmp = await createImageBitmap(file);
    const max = 800;
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.9));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

const fmt = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/** Hook: owns the file input + upload so any element on the page (dropzone, preview avatar) can open the picker. */
export function useLogoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<LogoState>(EMPTY_LOGO);

  const openPicker = () => inputRef.current?.click();

  const reset = () => {
    if (logo.previewUrl) URL.revokeObjectURL(logo.previewUrl);
    setLogo(EMPTY_LOGO);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      setLogo({ ...EMPTY_LOGO, status: 'error', error: 'Only PNG, JPG, WEBP or GIF images are allowed.' });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setLogo({ ...EMPTY_LOGO, status: 'error', error: 'Image is too large. Please choose one under 15 MB.' });
      return;
    }
    const blob = await compress(file);
    const previewUrl = URL.createObjectURL(blob);
    setLogo({ previewUrl, uploadedUrl: '', status: 'uploading', progress: 0, error: '', fileName: file.name, sizeLabel: fmt(blob.size) });

    const fd = new FormData();
    fd.append('file', new File([blob], file.name.replace(/\.[^.]+$/, '') + (blob.type === 'image/webp' ? '.webp' : ''), { type: blob.type || file.type }));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/brand/logo');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setLogo((l) => ({ ...l, progress: Math.round((e.loaded / e.total) * 100) }));
    };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && json.url) {
          setLogo((l) => ({ ...l, status: 'done', progress: 100, uploadedUrl: json.url }));
        } else {
          setLogo((l) => ({ ...l, status: 'error', error: json.error || 'Upload failed. Please try again.' }));
        }
      } catch {
        setLogo((l) => ({ ...l, status: 'error', error: 'Upload failed. Please try again.' }));
      }
    };
    xhr.onerror = () => setLogo((l) => ({ ...l, status: 'error', error: 'Network error while uploading. Please try again.' }));
    xhr.send(fd);
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="image/png,image/jpeg,image/webp,image/gif"
      className="sr-only"
      tabIndex={-1}
      onChange={(e) => handleFile(e.target.files?.[0])}
    />
  );

  return { logo, input, openPicker, handleFile, reset };
}

type Props = {
  logo: LogoState;
  openPicker: () => void;
  onFile: (f: File | undefined | null) => void;
  onRemove: () => void;
};

export default function LogoDropzone({ logo, openPicker, onFile, onRemove }: Props) {
  const [dragging, setDragging] = useState(false);
  const has = !!logo.previewUrl;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload brand logo"
        onClick={openPicker}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openPicker())}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files?.[0]); }}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-4 sm:p-5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/40
          ${dragging ? 'border-primary bg-pink-50 scale-[1.01] shadow-lg shadow-primary/10' : 'border-pink-200 dark:border-white/15 bg-white/50 dark:bg-slate-900/40 hover:border-primary hover:bg-pink-50/60'}
          ${logo.status === 'error' ? '!border-red-300 !bg-red-50/60' : ''}`}
      >
        <div className="flex items-center gap-4">
          {/* Avatar / preview */}
          <div className="relative shrink-0">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center border border-pink-100 dark:border-white/10 bg-gradient-to-br from-pink-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-sm transition-transform group-hover:scale-[1.03]
              ${has ? '' : 'animate-pulse-soft'}`}
            >
              {has ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo.previewUrl} alt="Brand logo preview" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus className="w-8 h-8 text-primary/70" />
              )}
              {logo.status === 'uploading' && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-[10px] font-bold text-primary">{logo.progress}%</span>
                </div>
              )}
            </div>
            {logo.status === 'done' && (
              <span className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </span>
            )}
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            {has ? (
              <>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{logo.fileName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {logo.status === 'uploading' && 'Uploading securely…'}
                  {logo.status === 'done' && `Uploaded · ${logo.sizeLabel}`}
                  {logo.status === 'error' && 'Upload failed'}
                </p>
                {logo.status === 'uploading' && (
                  <div className="mt-2 h-1.5 w-full rounded-full bg-pink-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-pink-400 transition-all duration-200" style={{ width: `${logo.progress}%` }} />
                  </div>
                )}
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button type="button" onClick={(e) => { e.stopPropagation(); openPicker(); }} className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-pink-100 hover:bg-pink-200 px-2.5 py-1 rounded-lg transition-colors">
                    <RefreshCw className="w-3 h-3" /> Change
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-red-100 hover:text-red-600 px-2.5 py-1 rounded-lg transition-colors">
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-primary" /> Click to upload or drag &amp; drop
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  PNG, JPG, WEBP or GIF · square logo works best · auto-optimised for you
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {logo.error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{logo.error}</p>
      )}
    </div>
  );
}
