'use client';

import React, { useState } from 'react';
import { Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event request?')) return;
    
    setLoading(true);
    try {
      // Use update to set is_deleted true (since we have UPDATE policy but not DELETE policy)
      const { error } = await supabase.from('sponsora_posts').update({ is_deleted: true }).eq('id', eventId);
      if (error) throw error;
      
      setShowToast(true);
      setTimeout(() => {
        window.location.reload(); // Hard reload to trigger Next.js redirect if events == 0
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to delete event');
      setLoading(false);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 rounded-full shadow-lg font-bold text-white bg-red-500 animate-in fade-in slide-in-from-top-4">
            <Trash2 size={20} />
            Event successfully deleted!
        </div>
      )}
      <button 
        onClick={handleDelete}
        disabled={loading || showToast}
        className="flex items-center justify-center w-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        title="Delete Event"
      >
        {loading || showToast ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
      </button>
    </>
  );
}
