'use server';

import { supabaseServer } from '@/lib/supabase-server';

/**
 * Authentication has been removed from this app, so there is no external
 * user directory to sync with. These server actions operate on the local
 * `users` table in Supabase instead of Clerk.
 */

export async function getMainAppUsers() {
    try {
        const { data, error } = await supabaseServer
            .from('users')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error('Error fetching users:', error);
            return [];
        }

        return (data || []).map((user: any) => {
            const rawRole = user.role;
            let roles: string[] = [];
            if (Array.isArray(rawRole)) {
                roles = rawRole;
            } else if (typeof rawRole === 'string') {
                roles = [rawRole];
            } else {
                roles = ['participant'];
            }

            return {
                id: user.clerk_id || user.id,
                email: user.email || '',
                name: user.name || 'Unnamed User',
                roles,
                imageUrl: user.image_url || '',
                created_at: user.created_at
            };
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function deleteMainAppUser(userId: string) {
    try {
        const { error } = await supabaseServer
            .from('users')
            .delete()
            .eq('clerk_id', userId);

        if (error) {
            throw error;
        }
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export async function updateMainAppUserRole(userId: string, newRoles: string[]) {
    try {
        const { error } = await supabaseServer
            .from('users')
            .update({ role: newRoles })
            .eq('clerk_id', userId);

        if (error) {
            throw error;
        }
        return true;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
}
