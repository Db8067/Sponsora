import { supabase } from './supabase';

export type TrashItem = {
  id: string;
  type: 'image' | 'text';
  category: 'hero_banners' | 'brand_logos' | 'promo_texts' | 'search_texts';
  content: string;
  deletedAt: string;
};

export async function moveToTrash(item: Omit<TrashItem, 'id' | 'deletedAt'>) {
  try {
    // 1. Fetch current trash
    const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'trash').single();
    
    let currentTrash: TrashItem[] = [];
    if (!error && data?.value) {
      currentTrash = Array.isArray(data.value) ? data.value : [];
    }

    // 2. Append new item
    const newItem: TrashItem = {
      ...item,
      id: crypto.randomUUID(),
      deletedAt: new Date().toISOString(),
    };

    currentTrash.unshift(newItem); // Add to beginning

    // 3. Save back to Supabase
    await supabase.from('site_settings').upsert({ key: 'trash', value: currentTrash });
    
    return newItem;
  } catch (err) {
    console.error('Failed to move to trash:', err);
    return null;
  }
}

export async function getTrash(): Promise<TrashItem[]> {
  const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'trash').single();
  if (error || !data?.value) return [];
  return Array.isArray(data.value) ? data.value : [];
}

export async function removeFromTrash(id: string): Promise<TrashItem[]> {
  const currentTrash = await getTrash();
  const newTrash = currentTrash.filter(t => t.id !== id);
  await supabase.from('site_settings').upsert({ key: 'trash', value: newTrash });
  return newTrash;
}

export async function restoreFromTrash(item: TrashItem) {
  // 1. Get current active list for this category
  const { data, error } = await supabase.from('site_settings').select('value').eq('key', item.category).single();
  let activeList: string[] = [];
  if (!error && data?.value) {
    activeList = Array.isArray(data.value) ? data.value : [];
  }

  // 2. Add back to active list
  activeList.push(item.content);
  await supabase.from('site_settings').upsert({ key: item.category, value: activeList });

  // 3. Remove from trash
  await removeFromTrash(item.id);
}
