import React from 'react';
import { notFound } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import AdminLoggedOutScreen from '@/components/admin/AdminLoggedOutScreen';
import { getAdminAuth } from '@/lib/admin-data';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';
import { slugify } from '@/lib/validators';
import ClientDetailViewer from './ClientDetailViewer';

export const dynamic = 'force-dynamic';

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const auth = await getAdminAuth();
  if (!auth.authorized) {
    if (auth.status === 'logged_out') {
      return <AdminLoggedOutScreen />;
    }
    return <AdminAccessDenied userEmail={auth.userEmail} />;
  }
  const admin = auth.identity;

  const resolvedParams = await params;
  const rawSlug = decodeURIComponent(resolvedParams.slug || '').trim();

  const { client } = getAdminClient();
  const db = client || getAnonClient();

  if (!db) {
    return notFound();
  }

  // 1. Fetch credentials list to find match
  const { data: allCreds } = await db
    .from('client_credentials')
    .select('*')
    .order('created_at', { ascending: false });

  if (!allCreds || allCreds.length === 0) {
    return notFound();
  }

  // Find match by slugified name, username, or exact match
  const matchedClient = allCreds.find((c) => {
    const slugName = slugify(c.client_name || '');
    const slugUser = slugify(c.username || '');
    const targetSlug = slugify(rawSlug);
    return (
      slugName === targetSlug ||
      slugUser === targetSlug ||
      c.username.toLowerCase() === rawSlug.toLowerCase() ||
      c.client_name.toLowerCase() === rawSlug.toLowerCase()
    );
  });

  if (!matchedClient) {
    return notFound();
  }

  // 2. Fetch enrolled courses for this client
  const { data: courses } = await db
    .from('client_courses')
    .select('*')
    .eq('username', matchedClient.username)
    .order('created_at', { ascending: false });

  // 3. Fetch mentorship schedules for this client
  const { data: schedules } = await db
    .from('mentorship_schedules')
    .select('*')
    .eq('username', matchedClient.username)
    .order('session_date', { ascending: false });

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <ClientDetailViewer
        client={matchedClient}
        courses={courses || []}
        schedules={schedules || []}
      />
    </AdminLayout>
  );
}
