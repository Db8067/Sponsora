import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get('url');
    if (!rawUrl) return new Response('Missing url parameter', { status: 400 });

    const decodedUrl = decodeURIComponent(rawUrl).replace(/&amp;/g, '&');
    
    // Only allow proxying Instagram CDN images
    if (
      !decodedUrl.includes('cdninstagram.com') &&
      !decodedUrl.includes('fbcdn.net') &&
      !decodedUrl.includes('instagram.com') &&
      !decodedUrl.includes('akamaihd.net')
    ) {
      return new Response('Invalid host', { status: 403 });
    }

    const res = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://www.instagram.com/',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!res.ok) {
      return new Response('Failed to fetch image', { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (err: any) {
    return new Response('Proxy error: ' + err.message, { status: 500 });
  }
}
