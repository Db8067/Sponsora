import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import { Welcome99Client } from './WelcomeClient';
import { Welcome499Client } from './Welcome499Client';
import { Welcome1499Client } from './Welcome1499Client';

export async function generateStaticParams() {
  const { data: brands } = await supabaseServer
    .from('brand_registrations')
    .select('brand_name');

  if (!brands) return [];

  const slugs: { slug: string }[] = [];
  brands.forEach((b) => {
    const brandSlug = (b.brand_name || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    slugs.push({ slug: `${brandSlug}-welcome-99` });
    slugs.push({ slug: `${brandSlug}-welcome-499` });
    slugs.push({ slug: `${brandSlug}-welcome-1499` });
  });

  return slugs;
}

export default async function WelcomePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const fullSlug = resolvedParams.slug;
  
  let amount = '';
  if (fullSlug.endsWith('-welcome-1499')) amount = '1499';
  else if (fullSlug.endsWith('-welcome-499')) amount = '499';
  else if (fullSlug.endsWith('-welcome-99')) amount = '99';
  else return notFound();
  
  const brandSlug = fullSlug.replace(`-welcome-${amount}`, '').toLowerCase();
  
  const { data: brands, error } = await supabaseServer
    .from('brand_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  let matchedBrand = null;
  if (!error && brands && brands.length > 0) {
    matchedBrand = brands.find(b => {
       const bSlug = (b.brand_name || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
       return bSlug === brandSlug;
    });
  }

  const props = {
    slug: brandSlug,
    brand: matchedBrand?.brand_name,
    founder: matchedBrand?.founder_name,
    email: matchedBrand?.email,
    phone: matchedBrand?.whatsapp_number,
    plan: amount === '1499' ? 'Business Scale' : amount === '499' ? 'Growth Pro' : 'Starter Maker',
    amount: amount
  };

  if (amount === '499') return <Welcome499Client {...props} />;
  if (amount === '1499') return <Welcome1499Client {...props} />;
  return <Welcome99Client {...props} />;
}

