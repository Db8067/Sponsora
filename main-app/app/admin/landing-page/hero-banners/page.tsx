'use client';
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Save, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
import Link from 'next/link';

const DEFAULT_BANNERS = [
  '/images/doodle_banner_1_1783685779156.png',
  '/images/doodle_banner_2_1783685795061.png',
  '/images/doodle_banner_3_1783685812120.png',
];

export default function HeroBannersAdmin() {
  const [heroBanners, setHeroBanners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);

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

  async function saveSetting() {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key: 'hero_banners', value: heroBanners });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Hero banners saved successfully!', type: 'success' });
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
        setHeroBanners(prev => [...prev, data.secure_url || data.url]);
      } else {
        setAlert({ message: 'Upload failed: ' + (data.error || 'Unknown error'), type: 'error' });
      }
    } catch (err) {
      setAlert({ message: 'Upload error', type: 'error' });
    }
    setUploadingImage(false);
  }

  const removeImage = (index: number) => {
    setHeroBanners(heroBanners.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>;

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Hero Banners</h1>
          <p className="text-slate-500 mt-1">Upload and manage the large scrolling image banners.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-lg">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Manage Banners</h2>
              <p className="text-xs text-slate-500 mt-1">Recommended size: LinkedIn Banner format (1584 x 396px)</p>
            </div>
          </div>
          <button 
            onClick={saveSetting}
            disabled={saving || uploadingImage}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heroBanners.map((url, idx) => (
            <div key={idx} className="relative group border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden aspect-[4/1] bg-slate-100 dark:bg-slate-800 shadow-sm">
              <img src={url} alt="Hero Banner" className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 p-2 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <label className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl flex flex-col items-center justify-center aspect-[4/1] bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-500 relative">
            {uploadingImage ? (
               <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            ) : (
              <>
                <Upload className="w-8 h-8 mb-3 text-purple-400" />
                <span className="text-sm font-medium">Upload New Banner</span>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
          </label>
        </div>
      </div>
    </div>
  );
}
