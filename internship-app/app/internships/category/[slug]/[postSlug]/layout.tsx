import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

type Props = {
  params: { slug: string; postSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, postSlug } = params;

  // Fetch post data for title
  const { data: internship } = await supabase
    .from('sponsora_posts')
    .select('title')
    .eq('slug', postSlug)
    .single();

  // Fetch category data for banner image
  const { data: category } = await supabase
    .from('sponsora_categories')
    .select('image_url')
    .eq('slug', slug)
    .single();

  const title = internship?.title || 'Internship Opportunity';
  const description = 'Internship Logistics';
  const categoryBanner = category?.image_url || '/images/og-banner.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: categoryBanner,
          width: 1200,
          height: 630,
        }
      ]
    }
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
