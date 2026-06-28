'use client';

import React, { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event request?')) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.from('sponsora_posts').delete().eq('id', eventId);
      if (error) throw error;
      
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center justify-center w-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
      title="Delete Event"
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
