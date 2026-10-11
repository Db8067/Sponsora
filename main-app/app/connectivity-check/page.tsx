import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import AdminLoggedOutScreen from '@/components/admin/AdminLoggedOutScreen';
import { getAdminAuth } from '@/lib/admin-data';
import ConnectivityDashboard from './ConnectivityDashboard';

export const dynamic = 'force-dynamic';

export default async function ConnectivityCheckPage() {
  const auth = await getAdminAuth();
  if (!auth.authorized) {
    if (auth.status === 'logged_out') {
      return <AdminLoggedOutScreen />;
    }
    return <AdminAccessDenied userEmail={auth.userEmail} />;
  }
  const admin = auth.identity;

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <ConnectivityDashboard />
    </AdminLayout>
  );
}
