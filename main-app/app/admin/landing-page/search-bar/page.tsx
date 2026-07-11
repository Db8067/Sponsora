'use client';
import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Save, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
import Link from 'next/link';

export default function SearchBarAdmin() {
  const [searchTexts, setSearchTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'search_texts').single();
      if (!error && data) {
        setSearchTexts(data.value || []);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function saveSetting() {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key: 'search_texts', value: searchTexts });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Search bar texts saved successfully!', type: 'success' });
    }
    setSaving(false);
  }

  const handleStringChange = (index: number, val: string) => {
    const newArr = [...searchTexts];
    newArr[index] = val;
    setSearchTexts(newArr);
  };
  const removeString = (index: number) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setSearchTexts(searchTexts.filter((_, i) => i !== index));
    }
  };
  const addString = () => {
    setSearchTexts([...searchTexts, '']);
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;

  return (
    <div className="pb-20 max-w-4xl mx-auto">
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Search Bar Texts</h1>
          <p className="text-slate-500 mt-1">Update the typing animation phrases in the main search bar.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-lg">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">Edit Texts</h2>
          </div>
          <button 
            onClick={saveSetting}
            disabled={saving}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </div>
        
        <div className="space-y-4">
          {searchTexts.map((text, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input 
                type="text" 
                value={text} 
                onChange={(e) => handleStringChange(idx, e.target.value)}
                className="flex-1 bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 font-medium" 
                placeholder="Enter search phrase..."
              />
              <button onClick={() => removeString(idx)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button onClick={addString} className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-4 p-2">
            <Plus className="w-4 h-4" /> Add Search Phrase
          </button>
        </div>
      </div>
    </div>
  );
}
