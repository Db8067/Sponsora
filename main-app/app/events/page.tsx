import { supabase } from "@/lib/supabase";
import EventsClient from "./EventsClient";

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const { data: cats } = await supabase
    .from('sponsora_categories')
    .select('*')
    .eq('type', 'event')
    .or('is_deleted.is.null,is_deleted.eq.false')
    .order('sort_order', { ascending: true });

  const initialCategories = (cats || []).map((c: any) => ({
    title: c.name || c.title,
    description: c.description,
    href: `/events/category/${c.slug || c.id}`,
    bgImage: c.image_url || "/images/tech_events_doodle.png"
  }));

  return <EventsClient initialCategories={initialCategories} />;
}
