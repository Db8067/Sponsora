import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import AutoRefresh from '@/components/admin/AutoRefresh';
import { BrandLogo, STATUS_STYLES } from '@/components/admin/shared';
import { requireAdmin, fetchBrands } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === '' || children === false) return null;
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-800 break-words">{children}</dd>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-sm p-4 sm:p-6">
      <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-4 pb-3 border-b border-pink-50">
        <span className="material-symbols-outlined text-pink-500 text-[20px]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function AdminBrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return <div className="min-h-screen flex items-center justify-center px-4 text-red-500 font-bold text-center">Access Denied</div>;
  }

  const { slug } = await params;
  const { rows, error } = await fetchBrands();
  const brand = rows.find((b) => b.slug === slug.toLowerCase());

  const back = (
    <Link href="/admin-brandform" className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-800">
      <span className="material-symbols-outlined text-[18px]">arrow_back</span> All brands
    </Link>
  );

  if (error || !brand) {
    return (
      <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
        <div className="pt-6 pb-12">
          {back}
          <div className="mt-4 bg-white/90 rounded-2xl border border-pink-100 p-6 text-center">
            <span className="material-symbols-outlined text-[44px] text-slate-300">search_off</span>
            <h1 className="text-lg font-bold text-slate-800 mt-2">{error ? 'Could not load brand' : 'Brand not found'}</h1>
            <p className="text-sm text-slate-500 mt-1 break-words">{error || `No brand matches “${slug}”.`}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const st = brand.status || 'pending';
  const g = brand.gst_details;
  const ig = brand.instagram_info;
  const igHandle = (brand.instagram_handle || '').replace('@', '');
  const website = brand.brand_website || brand.store_link;

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AutoRefresh seconds={30} />
      <div className="pt-5 sm:pt-6 pb-12 w-full space-y-5">
        {back}

        {/* Header */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <BrandLogo url={brand.brand_logo_url} name={brand.brand_name} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-words">{brand.brand_name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${STATUS_STYLES[st] || STATUS_STYLES.pending}`}>{st}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Founded by <b className="text-slate-700">{brand.founder_name}</b>{brand.city ? ` · ${brand.city}` : ''}</p>
              <p className="text-xs text-slate-400 mt-1">Registered {new Date(brand.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.whatsapp_number && (
                <a href={`https://wa.me/91${brand.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold shadow-md transition-colors">WhatsApp</a>
              )}
              {brand.email && (
                <a href={`mailto:${brand.email}`} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold shadow-md transition-colors">Email</a>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card title="Brand & Founder" icon="storefront">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Brand name">{brand.brand_name}</Field>
              <Field label="Founder name">{brand.founder_name}</Field>
              <Field label="City">{brand.city}</Field>
              <Field label="Category">{brand.category}</Field>
              <Field label="Status"><span className="capitalize">{st}</span></Field>
              <Field label="Admin notes">{brand.notes}</Field>
            </dl>
          </Card>

          <Card title="Contact" icon="call">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Business email">{brand.email && <a className="text-pink-600 hover:underline" href={`mailto:${brand.email}`}>{brand.email}</a>}</Field>
              <Field label="WhatsApp number">{brand.whatsapp_number && <a className="text-pink-600 hover:underline" href={`https://wa.me/91${brand.whatsapp_number}`} target="_blank" rel="noopener noreferrer">+91 {brand.whatsapp_number}</a>}</Field>
            </dl>
          </Card>

          <Card title="Online Presence" icon="public">
            <div className="space-y-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Instagram">{brand.instagram_handle && <a className="text-pink-600 hover:underline" href={`https://www.instagram.com/${igHandle}/`} target="_blank" rel="noopener noreferrer">{brand.instagram_handle}</a>}</Field>
                <Field label="Website">{website && <a className="text-sky-600 hover:underline" href={website} target="_blank" rel="noopener noreferrer">{website}</a>}</Field>
              </dl>
              {ig && (
                <div className="rounded-xl border border-pink-100 bg-pink-50/40 p-3.5 flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shrink-0">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                      {ig.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ig.avatar} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-pink-500">photo_camera</span>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 text-sm">
                    <p className="font-bold text-slate-800 truncate">{ig.fullName || `@${ig.handle}`}</p>
                    {ig.followers ? (
                      <p className="text-xs text-slate-500">{ig.posts} posts · {ig.followers} followers · {ig.following} following</p>
                    ) : (
                      <p className="text-xs text-slate-500">{ig.note || 'Profile format verified'}</p>
                    )}
                    {ig.bio && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ig.bio}</p>}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card title="GST Details" icon="receipt_long">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="GST registered">{brand.gst_status === 'yes' ? 'Yes — Registered' : 'No — Unregistered'}</Field>
              <Field label="GSTIN">{brand.gstin && <span className="font-mono tracking-wide">{brand.gstin}</span>}</Field>
              {g && (
                <>
                  <Field label="Legal name">{g.legalName}</Field>
                  <Field label="Trade name">{g.tradeName}</Field>
                  <Field label="PAN"><span className="font-mono">{g.pan}</span></Field>
                  <Field label="State">{g.state ? `${g.state} (${g.stateCode})` : ''}</Field>
                  <Field label="Business type">{g.constitution || g.entityType}</Field>
                  <Field label="Taxpayer type">{g.taxpayerType}</Field>
                  <Field label="GST status">{g.status}</Field>
                  <Field label="Registered on">{g.registrationDate}</Field>
                  <div className="sm:col-span-2"><Field label="Address">{g.address}</Field></div>
                  <div className="sm:col-span-2"><Field label="Nature of business">{g.businessNature?.join(', ')}</Field></div>
                  <div className="sm:col-span-2 text-[11px] text-slate-400">
                    {g.source === 'govt-api' ? 'Confirmed by the brand · fetched from the GST portal' : 'Confirmed by the brand · decoded from the GSTIN'}
                  </div>
                </>
              )}
              {brand.gst_status === 'yes' && !g && <div className="sm:col-span-2 text-xs text-slate-400">The brand did not confirm GST details on the form.</div>}
            </dl>
          </Card>
        </div>

        <Card title="Registration Record" icon="fingerprint">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Record ID"><span className="font-mono text-xs">{brand.id}</span></Field>
            <Field label="Page slug"><span className="font-mono text-xs">/admin-brandform-{brand.slug}</span></Field>
            <Field label="Logo file">{brand.brand_logo_url && <a className="text-sky-600 hover:underline break-all text-xs" href={brand.brand_logo_url} target="_blank" rel="noopener noreferrer">Open original</a>}</Field>
          </dl>
        </Card>
      </div>
    </AdminLayout>
  );
}
