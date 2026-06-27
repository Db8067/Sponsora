'use server';

import { supabaseServer } from '@/lib/supabase-server';

export async function getMainAppUsers() {
    const { data, error } = await supabaseServer
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching main app users:', error);
        return [];
    }
    return data;
}

export async function deleteMainAppUser(userId: string) {
    const { error } = await supabaseServer.from('users').delete().eq('id', userId);
    if (error) throw error;
    return true;
}

export async function updateMainAppUserRole(userId: string, newRole: string) {
    const { error } = await supabaseServer.from('users').update({ role: newRole }).eq('id', userId);
    if (error) throw error;
    return true;
}
