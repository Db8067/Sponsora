import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import AdminLoggedOutScreen from '@/components/admin/AdminLoggedOutScreen';
import { getAdminAuth } from '@/lib/admin-data';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';
import AllClientViewer from './AllClientViewer';

export const dynamic = 'force-dynamic';

export default async function AllClientPage() {
  const auth = await getAdminAuth();
  if (!auth.authorized) {
    if (auth.status === 'logged_out') {
      return <AdminLoggedOutScreen />;
    }
    return <AdminAccessDenied userEmail={auth.userEmail} />;
  }
  const admin = auth.identity;

  const { client } = getAdminClient();
  const db = client || getAnonClient();

  let credentials: any[] = [];
  let courses: any[] = [];
  let schedules: any[] = [];

  if (db) {
    const [resCreds, resCourses, resScheds] = await Promise.all([
      db.from('client_credentials').select('*').order('created_at', { ascending: false }),
      db.from('client_courses').select('*').order('created_at', { ascending: false }),
      db.from('mentorship_schedules').select('*').order('session_date', { ascending: false }),
    ]);

    credentials = resCreds.data || [];
    courses = resCourses.data || [];
    schedules = resScheds.data || [];
  }

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AllClientViewer
        credentials={credentials}
        courses={courses}
        schedules={schedules}
      />
    </AdminLayout>
  );
}
