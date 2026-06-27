'use client';

import React, { useState, useEffect } from 'react';
import { User, Trash2, X, CheckCircle, Search, ShieldAlert, UserCog, Check } from 'lucide-react';
import { getMainAppUsers, deleteMainAppUser, updateMainAppUserRole } from './actions';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function AdminDashboardPage() {
    const { user, isLoaded } = useUser();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('participant');
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

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
        return <div className="p-12 text-center font-semibold text-gray-500">Loading...</div>;
    }

    const filteredUsers = users.filter(u => 
        (u.roles?.includes(activeTab)) && 
        (u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         u.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const openProfile = (u: any) => {
        setSelectedUser(u);
        setSelectedRoles(u.roles || ['participant']);
    };

    const toggleRole = (role: string) => {
        if (selectedRoles.includes(role)) {
            if (selectedRoles.length === 1) return; // Must have at least one role
            setSelectedRoles(selectedRoles.filter(r => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) return;
        
        try {
            await deleteMainAppUser(userId);
            setUsers(users.filter(u => u.id !== userId));
            setSelectedUser(null);
            setToast({ message: 'User deleted successfully.', type: 'success' });
        } catch (err) {
            console.error('Error deleting user:', err);
            setToast({ message: 'Failed to delete user.', type: 'error' });
        }
    };

    const handleSaveRoles = async () => {
        if (!selectedUser) return;
        try {
            await updateMainAppUserRole(selectedUser.id, selectedRoles);
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, roles: selectedRoles } : u));
            setSelectedUser(null);
            setToast({ message: `User roles updated successfully.`, type: 'success' });
        } catch (err) {
            console.error('Error updating user role:', err);
            setToast({ message: 'Failed to update user roles.', type: 'error' });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto pt-24 min-h-screen relative">
            
            {/* Custom Toast Notification */}
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 rounded-full shadow-lg font-bold text-white transition-all animate-in fade-in slide-in-from-top-4 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <ShieldAlert size={20} />}
                    {toast.message}
                </div>
            )}

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
                    {filteredUsers.map(u => (
                        <div key={u.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                {u.imageUrl ? (
                                    <div className="w-12 h-12 relative rounded-2xl overflow-hidden shrink-0">
                                        <Image src={u.imageUrl} alt={u.name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl uppercase shrink-0">
                                        {u.name?.[0] || u.email[0]}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{u.name || 'Unnamed User'}</h4>
                                    <p className="text-sm text-gray-500 truncate">{u.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => openProfile(u)}
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
                    <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="text-center mb-6">
                            {selectedUser.imageUrl ? (
                                <div className="w-20 h-20 relative rounded-3xl overflow-hidden mx-auto mb-4 shadow-md">
                                    <Image src={selectedUser.imageUrl} alt={selectedUser.name} fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-20 h-20 mx-auto bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center font-black text-3xl uppercase mb-4 shadow-inner">
                                    {selectedUser.name?.[0] || selectedUser.email[0]}
                                </div>
                            )}
                            
                            <h2 className="text-xl font-bold text-gray-900">{selectedUser.name || 'Unnamed User'}</h2>
                            <p className="text-gray-500">{selectedUser.email}</p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                                {selectedUser.roles?.map((r: string) => (
                                    <span key={r} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle size={12} /> {r}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-1">Override Permissions</h3>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Select the roles you want to assign to this user. They can access multiple portals if assigned.</p>
                                
                                <div className="space-y-2 mb-4">
                                    {['participant', 'organizer', 'sponsor'].map((role) => (
                                        <label key={role} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedRoles.includes(role) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${selectedRoles.includes(role) ? 'bg-indigo-600 text-white' : 'border border-gray-300'}`}>
                                                {selectedRoles.includes(role) && <Check size={14} strokeWidth={3} />}
                                            </div>
                                            <span className={`text-sm font-semibold capitalize ${selectedRoles.includes(role) ? 'text-indigo-900' : 'text-gray-600'}`}>{role}</span>
                                        </label>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={handleSaveRoles}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition-all"
                                >
                                    Save Roles
                                </button>
                            </div>

                            <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                                <h3 className="text-sm font-bold text-red-900 mb-3 text-center">Danger Zone</h3>
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
