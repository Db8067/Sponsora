'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, X, Loader2, ArrowLeft, Upload, ClipboardPaste, Crop } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { ImageCropper } from '@/components/ImageCropper';
import { moveToTrash } from '@/lib/trash';
import Link from 'next/link';

const DEFAULT_BRANDS = [
  '/images/brand_logo_1_1783687140018.png',
  '/images/brand_logo_2_1783687157325.png',
  '/images/brand_logo_3_1783687174335.png',
  '/images/brand_logo_4_1783687191532.png',
];

export default function BrandLogosAdmin() {
  const [brandLogos, setBrandLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  const [confirmDelete, setConfirmDelete] = useState<{isOpen: boolean, index: number | null}>({ isOpen: false, index: null });
  const [imageToCrop, setImageToCrop] = useState<{url: string, index: number} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'brand_logos').single();
      if (!error && data && data.value && data.value.length > 0) {
        setBrandLogos(data.value);
      } else {
        setBrandLogos(DEFAULT_BRANDS);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function autoSave(newData: string[]) {
    const { error } = await supabase.from('site_settings').upsert({ key: 'brand_logos', value: newData });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Saved automatically!', type: 'success' });
    }
  }

  async function uploadFile(file: File): Promise<string | null> {
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
        setUploadingImage(false);
        return data.secure_url || data.url;
      } else {
        setAlert({ message: 'Upload failed: ' + (data.error || 'Unknown error'), type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Upload error', type: 'error' });
    }
    setUploadingImage(false);
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) {
        const newArr = [...brandLogos, url];
        setBrandLogos(newArr);
        autoSave(newArr);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const file = new File([blob], "pasted-image.png", { type });
            const url = await uploadFile(file);
            if (url) {
              const newArr = [...brandLogos, url];
              setBrandLogos(newArr);
              autoSave(newArr);
            }
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

  const confirmRemoveImage = async () => {
    if (confirmDelete.index !== null) {
      const removedUrl = brandLogos[confirmDelete.index];
      // Move to trash
      await moveToTrash({ type: 'image', category: 'brand_logos', content: removedUrl });
      
      const newArr = brandLogos.filter((_, i) => i !== confirmDelete.index);
      setBrandLogos(newArr);
      autoSave(newArr);
    }
    setConfirmDelete({ isOpen: false, index: null });
  };

  const handleCropComplete = async (croppedFile: File) => {
    if (!imageToCrop) return;
    const oldUrl = brandLogos[imageToCrop.index];
    const newUrl = await uploadFile(croppedFile);
    
    if (newUrl) {
      // Move old to trash
      await moveToTrash({ type: 'image', category: 'brand_logos', content: oldUrl });
      
      const newArr = [...brandLogos];
      newArr[imageToCrop.index] = newUrl;
      setBrandLogos(newArr);
      autoSave(newArr);
    }
    setImageToCrop(null);
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop.url}
          onCropComplete={handleCropComplete}
          onCancel={() => setImageToCrop(null)}
        />
      )}
      
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <ConfirmAlert 
        isOpen={confirmDelete.isOpen} 
        message="Are you sure you want to delete this logo?" 
        onConfirm={confirmRemoveImage} 
        onCancel={() => setConfirmDelete({ isOpen: false, index: null })} 
      />
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Brand Logos Marquee</h1>
          <p className="text-slate-500 mt-1">Upload logos for the endless scrolling brands section. Changes save automatically.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400 rounded-lg">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Manage Logos</h2>
        </div>
        
        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Add New Logo</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 transition-colors cursor-pointer text-slate-500">
              {uploadingImage ? (
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-orange-400" />
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
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              ) : (
                <>
                  <ClipboardPaste className="w-8 h-8 text-orange-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Paste from Clipboard</span>
                  <span className="text-xs">Copy image & click here</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8">
          <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Existing Logos</h3>
          <div className="flex flex-wrap gap-6">
            {brandLogos.map((url, idx) => (
              <div key={idx} className="relative group border border-slate-200 dark:border-white/10 rounded-2xl overflow-visible w-40 h-24 bg-white flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow">
                <img src={url} alt="Brand Logo" className="w-full h-full object-contain" />
                <div className="absolute -top-3 -right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button 
                    onClick={() => setImageToCrop({ url, index: idx })}
                    className="bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-blue-200 shadow-md"
                    title="Edit & Crop"
                  >
                    <Crop className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeImage(idx)}
                    className="bg-red-100 p-2 rounded-full text-red-600 hover:bg-red-200 shadow-md"
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
