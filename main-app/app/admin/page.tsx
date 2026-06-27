'use client';

import React, { useState, useEffect } from 'react';
import { User, Trash2, X, CheckCircle, Search, ShieldAlert, UserCog } from 'lucide-react';
import { getMainAppUsers, deleteMainAppUser, updateMainAppUserRole } from './actions';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function AdminDashboardPage() {
    const { user, isLoaded } = useUser();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('participant');
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isLoaded && !user) {
            redirect('/sign-in');
        }
    }, [user, isLoaded]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getMainAppUsers();
            setUsers(data || []);
        } catch (err) {
            console.error('Error fetching main app users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoaded && user) {
            fetchUsers();
        }
    }, [isLoaded, user]);

    if (!isLoaded || !user) {
        return <div className="p-12 text-center">Loading...</div>;
    }

    const filteredUsers = users.filter(u => 
        u.role === activeTab && 
        (u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         u.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) return;
        
        try {
            await deleteMainAppUser(userId);
            setUsers(users.filter(u => u.id !== userId));
            setSelectedUser(null);
            alert('User deleted successfully.');
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user.');
        }
    };

    const handleChangeRole = async (userId: string, newRole: string) => {
        try {
            await updateMainAppUserRole(userId, newRole);
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setSelectedUser(null);
            alert(`User role updated to ${newRole}.`);
        } catch (err) {
            console.error('Error updating user role:', err);
            alert('Failed to update user role.');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto pt-24 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <UserCog className="text-indigo-600" size={32} />
                    Main App Users
                </h1>
                <p className="text-gray-500 mt-2">Manage Participants, Organizers, and Sponsors.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl mb-6 w-full max-w-2xl">
                {['participant', 'organizer', 'sponsor'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all capitalize ${
                            activeTab === tab 
                            ? 'bg-white text-indigo-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        {tab}s
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="mb-6 relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder={`Search ${activeTab}s by email or name...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
            </div>

            {/* Users List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="size-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                    <ShieldAlert className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900">No users found</h3>
                    <p className="text-gray-500">There are no {activeTab}s matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl uppercase">
                                    {user.name?.[0] || user.email[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{user.name || 'Unnamed User'}</h4>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedUser(user)}
                                className="w-full py-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl transition-colors text-sm"
                            >
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* User Profile Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
                    <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 overflow-hidden">
                        <button 
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 mx-auto bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center font-black text-3xl uppercase mb-4 shadow-inner">
                                {selectedUser.name?.[0] || selectedUser.email[0]}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedUser.name || 'Unnamed User'}</h2>
                            <p className="text-gray-500">{selectedUser.email}</p>
                            <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                <CheckCircle size={14} /> {selectedUser.role}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Override Permissions</h3>
                                <p className="text-xs text-gray-500 mb-3">Change this user's primary role to allow them access to different categories.</p>
                                <select 
                                    className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2 px-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={selectedUser.role}
                                    onChange={(e) => handleChangeRole(selectedUser.id, e.target.value)}
                                >
                                    <option value="participant">Participant</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="sponsor">Sponsor</option>
                                </select>
                            </div>

                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <h3 className="text-sm font-bold text-red-900 mb-2 text-center">Danger Zone</h3>
                                <button 
                                    onClick={() => handleDeleteUser(selectedUser.id)}
                                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                                >
                                    <Trash2 size={16} /> Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
