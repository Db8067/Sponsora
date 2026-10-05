import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

// Local shape of the Clerk webhook payload (avoids depending on Clerk SDK types,
// since authentication has been removed from this app).
type WebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
    unsafe_metadata?: Record<string, unknown> | null;
  };
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, unsafe_metadata } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ');
    const role = unsafe_metadata?.role || 'participant'; // Default to participant if no role was provided

    try {
      const { error } = await supabase.from('users').insert({
        clerk_id: id,
        email: email,
        name: name,
        role: role,
      });

      if (error) {
        console.error('Error inserting user into Supabase:', error);
        return new Response('Database error', { status: 500 });
      }

      console.log(`Successfully created user ${id} in Supabase with role ${role}`);
    } catch (dbError) {
      console.error('Failed to sync user to DB:', dbError);
      return new Response('Sync error', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
