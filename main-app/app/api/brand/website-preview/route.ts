import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get('url')?.trim();
    if (!rawUrl) {
      return NextResponse.json({ ok: false, error: 'No URL provided' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      const full = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
      parsedUrl = new URL(full);
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid URL format' }, { status: 400 });
    }

    const domain = parsedUrl.hostname.replace(/^(www\.)/, '');
    const defaultFavicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(parsedUrl.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
        redirect: 'follow',
        signal: ctrl.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        const html = await res.text();
        const ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(html)?.[1];
        const pageTitle = /<title[^>]*>([^<]+)<\/title>/i.exec(html)?.[1];
        const title = (ogTitle || pageTitle || domain).trim();

        const ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(html)?.[1];
        const metaDesc = /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i.exec(html)?.[1];
        const description = (ogDesc || metaDesc || `Visit ${domain} to explore products and services.`).trim();

        const ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(html)?.[1];
        let image: string | null = null;
        if (ogImg) {
          try {
            image = new URL(ogImg, parsedUrl.origin).toString();
          } catch {
            image = ogImg;
          }
        }

        const iconHref = /<link\s+[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i.exec(html)?.[1];
        let favicon = defaultFavicon;
        if (iconHref) {
          try {
            favicon = new URL(iconHref, parsedUrl.origin).toString();
          } catch {
            /* fallback to google favicons */
          }
        }

        return NextResponse.json({
          ok: true,
          domain,
          url: parsedUrl.toString(),
          title: title.slice(0, 100),
          description: description.slice(0, 200),
          image,
          favicon,
        });
      }
    } catch {
      /* fall through to basic domain info */
    }

    return NextResponse.json({
      ok: true,
      domain,
      url: parsedUrl.toString(),
      title: domain,
      description: `Official website for ${domain}`,
      image: null,
      favicon: defaultFavicon,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
