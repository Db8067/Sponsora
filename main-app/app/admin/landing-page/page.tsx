'use client';
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Layout, Plus, X, Save, Upload, Loader2, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LandingPageAdmin() {
  const [promoTexts, setPromoTexts] = useState<string[]>([]);
  const [searchTexts, setSearchTexts] = useState<string[]>([]);
  const [heroBanners, setHeroBanners] = useState<string[]>([]);
  const [brandLogos, setBrandLogos] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState<Record<string, boolean>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (!error && data) {
      data.forEach((setting) => {
        if (setting.key === 'promo_texts') setPromoTexts(setting.value || []);
        if (setting.key === 'search_texts') setSearchTexts(setting.value || []);
        if (setting.key === 'hero_banners') setHeroBanners(setting.value || []);
        if (setting.key === 'brand_logos') setBrandLogos(setting.value || []);
      });
    } else {
      console.error("Error fetching settings:", error);
    }
    setLoading(false);
  }

  async function saveSetting(key: string, value: any) {
    setSavingSettings((prev) => ({ ...prev, [key]: true }));
    const { error } = await supabase.from('site_settings').upsert({ key, value });
    if (error) {
      alert(`Failed to save ${key}: ${error.message}`);
    } else {
      alert(`${key.replace('_', ' ')} saved successfully!`);
    }
    setSavingSettings((prev) => ({ ...prev, [key]: false }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, stateUpdater: React.Dispatch<React.SetStateAction<string[]>>) {
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
        stateUpdater(prev => [...prev, data.secure_url || data.url]);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Upload error');
    }
    setUploadingImage(false);
  }

  // Helper arrays for string lists
  const handleStringChange = (index: number, val: string, setter: any, state: string[]) => {
    const newArr = [...state];
    newArr[index] = val;
    setter(newArr);
  };
  const removeString = (index: number, setter: any, state: string[]) => {
    setter(state.filter((_, i) => i !== index));
  };
  const addString = (setter: any, state: string[]) => {
    setter([...state, '']);
  };
  const removeImage = (index: number, setter: any, state: string[]) => {
    setter(state.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  return (
    <div className="pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Landing Page Manager</h1>
        <p className="text-slate-500 mt-2">Manage storefront content. All changes here will instantly reflect on the live homepage.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 1: Promo Bar Texts */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Promo Bar Texts</h2>
            </div>
            <button 
              onClick={() => saveSetting('promo_texts', promoTexts)}
              disabled={savingSettings['promo_texts']}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {savingSettings['promo_texts'] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
            </button>
          </div>
          
          <div className="space-y-3">
            {promoTexts.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => handleStringChange(idx, e.target.value, setPromoTexts, promoTexts)}
                  className="flex-1 bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter promo text..."
                />
                <button onClick={() => removeString(idx, setPromoTexts, promoTexts)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => addString(setPromoTexts, promoTexts)} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline mt-2">
              <Plus className="w-4 h-4" /> Add Promo Text
            </button>
          </div>
        </div>

        {/* Section 2: Search Bar Texts */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Search Bar Texts</h2>
            </div>
            <button 
              onClick={() => saveSetting('search_texts', searchTexts)}
              disabled={savingSettings['search_texts']}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {savingSettings['search_texts'] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
            </button>
          </div>
          
          <div className="space-y-3">
            {searchTexts.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => handleStringChange(idx, e.target.value, setSearchTexts, searchTexts)}
                  className="flex-1 bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Enter search animation text..."
                />
                <button onClick={() => removeString(idx, setSearchTexts, searchTexts)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => addString(setSearchTexts, searchTexts)} className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-2">
              <Plus className="w-4 h-4" /> Add Search Text
            </button>
          </div>
        </div>

        {/* Section 3: Hero Image Banners */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Hero Banners</h2>
                <p className="text-xs text-slate-500 mt-1">Recommended size: LinkedIn Banner format (1584 x 396px)</p>
              </div>
            </div>
            <button 
              onClick={() => saveSetting('hero_banners', heroBanners)}
              disabled={savingSettings['hero_banners']}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {savingSettings['hero_banners'] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {heroBanners.map((url, idx) => (
              <div key={idx} className="relative group border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden aspect-[4/1] bg-slate-100 dark:bg-slate-800">
                <img src={url} alt="Hero Banner" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(idx, setHeroBanners, heroBanners)}
                  className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 p-1.5 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <label className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl flex flex-col items-center justify-center aspect-[4/1] bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-500 relative">
              {uploadingImage ? (
                 <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : (
                <>
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Upload New Banner</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setHeroBanners)} disabled={uploadingImage} />
            </label>
          </div>
        </div>

        {/* Section 4: Brand Logos */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Brand Logos Marquee</h2>
            </div>
            <button 
              onClick={() => saveSetting('brand_logos', brandLogos)}
              disabled={savingSettings['brand_logos']}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {savingSettings['brand_logos'] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {brandLogos.map((url, idx) => (
              <div key={idx} className="relative group border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden w-32 h-20 bg-white flex items-center justify-center p-2 shadow-sm">
                <img src={url} alt="Brand Logo" className="w-full h-full object-contain" />
                <button 
                  onClick={() => removeImage(idx, setBrandLogos, brandLogos)}
                  className="absolute -top-2 -right-2 bg-red-100 p-1 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            <label className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl w-32 h-20 flex flex-col items-center justify-center bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-500">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium text-center">Add Logo</span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setBrandLogos)} />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
