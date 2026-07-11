'use client';
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Save, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
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
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);

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

  async function saveSetting() {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key: 'brand_logos', value: brandLogos });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Brand logos saved successfully!', type: 'success' });
    }
    setSaving(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setBrandLogos(prev => [...prev, data.secure_url || data.url]);
      } else {
        setAlert({ message: 'Upload failed: ' + (data.error || 'Unknown error'), type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Upload error', type: 'error' });
    }
    setUploadingImage(false);
  }

  const removeImage = (index: number) => {
    setBrandLogos(brandLogos.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Brand Logos Marquee</h1>
          <p className="text-slate-500 mt-1">Upload logos for the endless scrolling brands section.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400 rounded-lg">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">Manage Logos</h2>
          </div>
          <button 
            onClick={saveSetting}
            disabled={saving || uploadingImage}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </div>
        
        <div className="flex flex-wrap gap-6">
          {brandLogos.map((url, idx) => (
            <div key={idx} className="relative group border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden w-40 h-24 bg-white flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow">
              <img src={url} alt="Brand Logo" className="w-full h-full object-contain" />
              <button 
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-100 p-1.5 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          <label className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl w-40 h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-500">
            {uploadingImage ? (
               <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            ) : (
              <>
                <Upload className="w-6 h-6 mb-2 text-orange-400" />
                <span className="text-xs font-medium text-center">Add Logo</span>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
          </label>
        </div>
      </div>
    </div>
  );
}
