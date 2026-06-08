import { supabaseAdmin } from './supabase';

export interface SubscriptionStatus {
  isPaid: boolean;
  planType: string | null;
  validUntil: string | null;
  applyLimitPerDay: number;
  appliesToday: number;
}

export async function getUserSubscription(userId: string | null): Promise<SubscriptionStatus> {
  if (!userId) {
    return { isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 };
  }

  try {
    // Check subscription
    const { data: sub } = await supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!sub || sub.status !== 'active') {
      return { isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 };
    }

    // Check expiration
    const now = new Date();
    const validUntilDate = new Date(sub.valid_until);
    if (now > validUntilDate) {
      // Lazy expire
      await supabaseAdmin
        .from('user_subscriptions')
        .update({ status: 'expired' })
        .eq('id', sub.id);
      
      return { isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 };
    }

    // Check apply limits today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const { count } = await supabaseAdmin
      .from('applications_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfDay);

    return {
      isPaid: true,
      planType: sub.plan_type,
      validUntil: sub.valid_until,
      applyLimitPerDay: sub.apply_limit_per_day,
      appliesToday: count || 0,
    };
  } catch (err) {
    console.error('Error fetching subscription:', err);
    return { isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 };
  }
}

// Function to generate a random fake string of specific length using a block character
const generateFakeName = (length: number) => {
  const chars = '█▒▓░';
  let fake = '';
  for(let i=0; i<length; i++) {
    fake += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return fake;
};

// Returns a deterministic but randomized length between 8 and 18
const getRandomLength = (seedStr: string) => {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 8 + (Math.abs(hash) % 11); 
};

export function sanitizeInternship(internship: any, isPaid: boolean) {
  if (isPaid) return internship;

  const sanitized = { ...internship };

  // Determine metadata location depending on whether it's sponsora_posts or sponsora_internships
  const isPost = !!sanitized.metadata;
  
  if (isPost) {
    // Sanitize metadata
    const fakeLength = getRandomLength(sanitized.id || 'abc');
    if (sanitized.metadata.company_name) {
       sanitized.metadata.company_name = generateFakeName(fakeLength);
    }
    sanitized.metadata.company_logo_url = null;
    sanitized.metadata.apply_link = null;
  } else {
    // Sanitize direct columns (for detail page)
    const fakeLength = getRandomLength(sanitized.id || 'abc');
    if (sanitized.company_name) {
       sanitized.company_name = generateFakeName(fakeLength);
    }
    sanitized.company_logo_url = null;
    sanitized.apply_link = null;
    
    if (sanitized.internship && sanitized.internship.company_name) {
      sanitized.internship.company_name = generateFakeName(fakeLength);
    }
  }

  // We add a flag so the frontend knows it was blurred
  sanitized.isBlurred = true;

  return sanitized;
}
