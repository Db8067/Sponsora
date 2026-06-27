'use server';

import { clerkClient } from '@clerk/nextjs/server';

export async function getMainAppUsers() {
    try {
        const client = await clerkClient();
        const response = await client.users.getUserList({
            limit: 100,
            orderBy: '-created_at'
        });
        
        const users = response.data.map(user => {
            const email = user.emailAddresses[0]?.emailAddress || '';
            const name = [user.firstName, user.lastName].filter(Boolean).join(' ');
            
            let roles: string[] = [];
            const rawRole = user.unsafeMetadata?.role;
            if (Array.isArray(rawRole)) {
                roles = rawRole;
            } else if (typeof rawRole === 'string') {
                roles = [rawRole];
            } else {
                roles = ['participant']; // Default fallback
            }
            
            return {
                id: user.id,
                email,
                name: name || 'Unnamed User',
                roles,
                imageUrl: user.imageUrl,
                created_at: user.createdAt
            };
        });
        
        return users;
    } catch (error) {
        console.error('Error fetching main app users from Clerk:', error);
        return [];
    }
}

export async function deleteMainAppUser(userId: string) {
    try {
        const client = await clerkClient();
        await client.users.deleteUser(userId);
        return true;
    } catch (error) {
        console.error('Error deleting user from Clerk:', error);
        throw error;
    }
}

export async function updateMainAppUserRole(userId: string, newRoles: string[]) {
    try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
            unsafeMetadata: {
                role: newRoles
            }
        });
        return true;
    } catch (error) {
        console.error('Error updating user role in Clerk:', error);
        throw error;
    }
}
