'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Plus, X, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SaveAlert } from '@/components/SaveAlert';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { moveToTrash } from '@/lib/trash';
import Link from 'next/link';

export default function PromoBarAdmin() {
  const [promoTexts, setPromoTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  // Confirm Delete Modal State
  const [confirmDelete, setConfirmDelete] = useState<{isOpen: boolean, index: number | null}>({ isOpen: false, index: null });

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'promo_texts').single();
      if (!error && data) {
        setPromoTexts(data.value || []);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function autoSave(newData: string[]) {
    const { error } = await supabase.from('site_settings').upsert({ key: 'promo_texts', value: newData });
    if (error) {
      setAlert({ message: `Failed to save: ${error.message}`, type: 'error' });
    } else {
      setAlert({ message: 'Saved automatically!', type: 'success' });
    }
  }

  const handleStringChange = (index: number, val: string) => {
    const newArr = [...promoTexts];
    newArr[index] = val;
    setPromoTexts(newArr);
  };
  
  const handleStringBlur = () => {
    autoSave(promoTexts);
  };

  const removeString = (index: number) => {
    setConfirmDelete({ isOpen: true, index });
  };

  const confirmRemoveString = async () => {
    if (confirmDelete.index !== null) {
      const removedText = promoTexts[confirmDelete.index];
      await moveToTrash({ type: 'text', category: 'promo_texts', content: removedText });

      const newArr = promoTexts.filter((_, i) => i !== confirmDelete.index);
      setPromoTexts(newArr);
      autoSave(newArr);
    }
    setConfirmDelete({ isOpen: false, index: null });
  };

  const addString = () => {
    const newArr = [...promoTexts, ''];
    setPromoTexts(newArr);
    autoSave(newArr);
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  return (
    <div className="pb-20 max-w-4xl mx-auto">
      {alert && <SaveAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <ConfirmAlert 
        isOpen={confirmDelete.isOpen} 
        message="Are you sure you want to delete this text?" 
        onConfirm={confirmRemoveString} 
        onCancel={() => setConfirmDelete({ isOpen: false, index: null })} 
      />
      
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/landing-page" className="p-2 bg-white/10 dark:bg-slate-900/50 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Promo Bar Texts</h1>
          <p className="text-slate-500 mt-1">Manage the scrolling announcement texts. Changes are saved automatically.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg">
            <Layout className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Edit Texts</h2>
        </div>
        
        <div className="space-y-4">
          {promoTexts.map((text, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input 
                type="text" 
                value={text} 
                onChange={(e) => handleStringChange(idx, e.target.value)}
                onBlur={handleStringBlur}
                className="flex-1 bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-base sm:text-sm" 
                placeholder="Enter promo text..."
              />
              <button onClick={() => removeString(idx)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button onClick={addString} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline mt-4 p-2">
            <Plus className="w-4 h-4" /> Add Promo Text
          </button>
        </div>
      </div>
    </div>
  );
}
