'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, X, Loader2, ArrowLeft, Upload, ClipboardPaste } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import Link from 'next/link';

const DEFAULT_BANNERS = [
  '/images/doodle_banner_1_1783685779156.png',
  '/images/doodle_banner_2_1783685795061.png',
  '/images/doodle_banner_3_1783685812120.png',
];

export default function HeroBannersAdmin() {
  const [heroBanners, setHeroBanners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  const [confirmDelete, setConfirmDelete] = useState<{isOpen: boolean, index: number | null}>({ isOpen: false, index: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'hero_banners').single();
      if (!error && data && data.value && data.value.length > 0) {
        setHeroBanners(data.value);
      } else {
        setHeroBanners(DEFAULT_BANNERS);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function autoSave(newData: string[]) {
    const { error } = await supabase.from('site_settings').upsert({ key: 'hero_banners', value: newData });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Saved automatically!', type: 'success' });
    }
  }

  async function uploadFile(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'sponsora_storefront');
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (data.secure_url || data.url) {
        const url = data.secure_url || data.url;
        const newArr = [...heroBanners, url];
        setHeroBanners(newArr);
        autoSave(newArr);
      } else {
        setAlert({ message: 'Upload failed: ' + (data.error || 'Unknown error'), type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Upload error', type: 'error' });
    }
    setUploadingImage(false);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const file = new File([blob], "pasted-banner.png", { type });
            uploadFile(file);
            return;
          }
        }
      }
      setAlert({ message: 'No image found in clipboard. Please copy an image first.', type: 'error' });
    } catch (err) {
      setAlert({ message: 'Failed to read clipboard. Please allow permissions.', type: 'error' });
    }
  };

  const removeImage = (index: number) => {
    setConfirmDelete({ isOpen: true, index });
  };

  const confirmRemoveImage = () => {
    if (confirmDelete.index !== null) {
      const newArr = heroBanners.filter((_, i) => i !== confirmDelete.index);
      setHeroBanners(newArr);
      autoSave(newArr);
    }
    setConfirmDelete({ isOpen: false, index: null });
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>;

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <ConfirmAlert 
        isOpen={confirmDelete.isOpen} 
        message="Are you sure you want to delete this banner?" 
        onConfirm={confirmRemoveImage} 
        onCancel={() => setConfirmDelete({ isOpen: false, index: null })} 
      />
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Hero Image Banners</h1>
          <p className="text-slate-500 mt-1">Manage the large scrolling images at the top of the homepage. Changes save automatically.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-lg">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Manage Banners</h2>
        </div>
        
        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Add New Banner</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 transition-colors cursor-pointer text-slate-500">
              {uploadingImage ? (
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-purple-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Upload from Device</span>
                  <span className="text-xs">Click to browse files</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} ref={fileInputRef} />
            </label>

            <button 
              onClick={handlePaste} 
              disabled={uploadingImage}
              className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 transition-colors text-slate-500"
            >
              {uploadingImage ? (
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              ) : (
                <>
                  <ClipboardPaste className="w-8 h-8 text-purple-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Paste from Clipboard</span>
                  <span className="text-xs">Copy image & click here</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8">
          <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Existing Banners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {heroBanners.map((url, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-visible bg-slate-100 dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow p-2 flex items-center justify-center min-h-[160px]">
                <img src={url} alt="Hero Banner" className="w-full h-auto max-h-[250px] object-contain rounded-xl" />
                <button 
                  onClick={() => removeImage(idx)}
                  className="absolute -top-3 -right-3 bg-red-100 p-2 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-20 shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
