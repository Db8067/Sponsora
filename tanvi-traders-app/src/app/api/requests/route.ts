import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await currentUser();
        const userName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Unknown User';
        const userEmail = user?.emailAddresses[0]?.emailAddress || 'Unknown Email';

        const body = await req.json();
        const { phone, address, urgency, products } = body;

        // Map over products and insert into Supabase
        const insertPromises = products.map((p: any) => {
            return supabaseAdmin.from('tanvi_traders_requests').insert({
                user_id: userId,
                user_name: userName,
                user_email: userEmail,
                user_phone: phone,
                address: address,
                urgency: urgency,
                brand_name: p.brand,
                product_detail: p.detail,
                market_price: p.price || null,
                image_url: p.image || null,
                status: 'Pending'
            });
        });

        const results = await Promise.all(insertPromises);
        
        // Check for errors
        for (const res of results) {
            if (res.error) throw res.error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error submitting request:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
