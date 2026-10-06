import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import { Welcome99Client } from './WelcomeClient';

export async function generateStaticParams() {
  const { data: brands } = await supabaseServer
    .from('brand_registrations')
    .select('brand_name');

  if (!brands) return [];

  return brands.map((b) => {
    const brandSlug = (b.brand_name || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return {
      slug: `${brandSlug}-welcome-99`,
    };
  });
}

// Ensure the page acts as a dynamic route handling various brand slugs

export default async function Welcome99Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const fullSlug = resolvedParams.slug;
  
  // Must end with -welcome-99
  if (!fullSlug.endsWith('-welcome-99')) {
    // We let other routes handle it if they exist, but since it's [slug] catchall,
    // we return notFound if it's not our target format.
    return notFound();
  }
  
  const brandSlug = fullSlug.replace('-welcome-99', '').toLowerCase();
  
  // Fetch all brands from brand_registrations to find the matching one
  const { data: brands, error } = await supabaseServer
    .from('brand_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error && brands && brands.length > 0) {
    // Find the brand that matches the slug
    const matchedBrand = brands.find(b => {
       const bSlug = (b.brand_name || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
       return bSlug === brandSlug;
    });

    if (matchedBrand) {
      return (
        <Welcome99Client 
          slug={brandSlug}
          brand={matchedBrand.brand_name}
          founder={matchedBrand.founder_name}
          email={matchedBrand.email}
          phone={matchedBrand.whatsapp_number}
          plan="Starter Maker"
          amount="99"
        />
      );
    }
  }

  // If not found in DB or error occurred, we still render the Welcome page
  // as a fallback using the parsed slug, so the user can see it without crashing.
  return <Welcome99Client slug={brandSlug} />;
}
