'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, RotateCcw, Image as ImageIcon, Type, Loader2, AlertTriangle, Search } from 'lucide-react';
import { getTrash, removeFromTrash, restoreFromTrash, TrashItem } from '@/lib/trash';
import { ConfirmAlert } from '@/components/ConfirmAlert';

export default function TrashAdmin() {
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const [confirmDelete, setConfirmDelete] = useState<{isOpen: boolean, item: TrashItem | null}>({ isOpen: false, item: null });

  useEffect(() => {
    fetchTrash();
  }, []);

  async function fetchTrash() {
    setLoading(true);
    const items = await getTrash();
    setTrashItems(items);
    setLoading(false);
  }

  const handleRestore = async (item: TrashItem) => {
    setProcessingId(item.id);
    await restoreFromTrash(item);
    setTrashItems(prev => prev.filter(t => t.id !== item.id));
    setProcessingId(null);
  };

  const requestPermanentDelete = (item: TrashItem) => {
    setConfirmDelete({ isOpen: true, item });
  };

  const confirmPermanentDelete = async () => {
    const item = confirmDelete.item;
    if (!item) return;
    
    setConfirmDelete({ isOpen: false, item: null });
    setProcessingId(item.id);

    try {
      if (item.type === 'image') {
        await fetch('/api/delete-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: item.content })
        });
      }
      await removeFromTrash(item.id);
      setTrashItems(prev => prev.filter(t => t.id !== item.id));
    } catch (err) {
      console.error(err);
    }
    setProcessingId(null);
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-500" /></div>;

  // Group items by category
  const categorized = {
    hero_banners: trashItems.filter(t => t.category === 'hero_banners'),
    brand_logos: trashItems.filter(t => t.category === 'brand_logos'),
    promo_texts: trashItems.filter(t => t.category === 'promo_texts'),
    search_texts: trashItems.filter(t => t.category === 'search_texts'),
  };

  const renderItem = (item: TrashItem) => (
    <div key={item.id} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
      <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
        <span className="text-xs text-slate-400">
          Deleted on: {new Date(item.deletedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex-1 p-4 flex items-center justify-center min-h-[120px]">
        {item.type === 'image' ? (
          <img src={item.content} alt="Deleted item" className="max-h-32 object-contain rounded-lg" />
        ) : (
          <div className="flex items-center gap-3 text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl w-full">
            <Type className="w-5 h-5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-700 dark:text-slate-200 break-words line-clamp-3">
              "{item.content}"
            </span>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-white/5 flex justify-between gap-3">
        <button
          onClick={() => handleRestore(item)}
          disabled={processingId === item.id}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {processingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
          Restore
        </button>
        <button
          onClick={() => requestPermanentDelete(item)}
          disabled={processingId === item.id}
          className="flex items-center justify-center py-2 px-4 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-xl transition-colors disabled:opacity-50"
          title="Delete Forever"
        >
          {processingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="pb-20 max-w-5xl mx-auto relative z-10">
      <ConfirmAlert 
        isOpen={confirmDelete.isOpen} 
        message="This will permanently delete this item from your storage. This action cannot be undone. Are you sure?" 
        onConfirm={confirmPermanentDelete} 
        onCancel={() => setConfirmDelete({ isOpen: false, item: null })} 
      />

      <div className="mb-6 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trash2 className="w-8 h-8 text-slate-400" />
            Trash
          </h1>
          <p className="text-slate-500 mt-1 max-w-lg">
            Deleted items are grouped by their categories. You can restore them or permanently delete them to free up storage.
          </p>
        </div>
      </div>

      {trashItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-dashed border-slate-300 dark:border-white/20">
          <Trash2 className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-500">Trash is empty</h3>
          <p className="text-slate-400">Items you delete will appear here.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Main Category: Landing Page */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b pb-2">Landing Page</h2>
            
            <div className="space-y-10 pl-2">
              {categorized.hero_banners.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Hero Banners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorized.hero_banners.map(renderItem)}
                  </div>
                </div>
              )}
              
              {categorized.brand_logos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Brand Logos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorized.brand_logos.map(renderItem)}
                  </div>
                </div>
              )}

              {categorized.promo_texts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Promo Texts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorized.promo_texts.map(renderItem)}
                  </div>
                </div>
              )}

              {categorized.search_texts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Search Phrases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorized.search_texts.map(renderItem)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
