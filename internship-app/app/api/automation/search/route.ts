import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SearchResultItem {
  name: string;
  verifiedTitle: string;
  company: string;
  linkedinUrl: string;
  location?: string;
  headline?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'FALLBACK';
  source: 'DuckDuckGo Proxy (Free)' | 'Google Serper' | 'Gemini Search' | 'Company Directory Fallback';
  isFallback?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, targetTitle, id } = body;

    if (!company || !targetTitle) {
      return NextResponse.json({
        success: false,
        error: 'Both company name and target title are required.',
      }, { status: 400 });
    }

    const cleanComp = company.trim();
    const cleanTit = targetTitle.trim();

    // Priority 1: DuckDuckGo Direct Search Proxy (100% Free)
    let results = await searchDuckDuckGo(cleanComp, cleanTit);

    // Priority 2: If no results or DuckDuckGo failed, check Serper or Gemini fallback
    if (!results || results.length === 0) {
      const serperKey = process.env.SERPER_API_KEY;
      const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (serperKey) {
        results = await searchSerper(cleanComp, cleanTit, serperKey);
      } else if (geminiKey) {
        results = await searchGeminiGrounding(cleanComp, cleanTit, geminiKey);
      }
    }

    // Priority 3: Fallback handling if no profile was matched
    if (!results || results.length === 0) {
      const companySlug = cleanComp.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const fallbackUrl = `https://www.linkedin.com/company/${companySlug}/people/`;
      const searchFallbackUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:linkedin.com/in "${cleanComp}" "${cleanTit}"`)}`;

      results = [
        {
          name: 'Manual Verification Needed',
          verifiedTitle: cleanTit,
          company: cleanComp,
          linkedinUrl: fallbackUrl,
          headline: `No direct personal profile indexed. Check official company people directory.`,
          location: 'Global / Head office',
          confidence: 'FALLBACK',
          source: 'Company Directory Fallback',
          isFallback: true,
        },
      ];
    }

    return NextResponse.json({
      success: true,
      id,
      company: cleanComp,
      targetTitle: cleanTit,
      matchCount: results.length,
      profiles: results,
    });
  } catch (err: any) {
    console.error('Executive search error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Search execution failed',
    }, { status: 500 });
  }
}

// -------------------------------------------------------------
// Priority 1: DuckDuckGo Free HTML Search Proxy
// -------------------------------------------------------------
async function searchDuckDuckGo(company: string, targetTitle: string): Promise<SearchResultItem[]> {
  try {
    const query = `site:linkedin.com/in "${company}" "${targetTitle}"`;
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const results: SearchResultItem[] = [];

    // Extract result blocks using regex to avoid heavy DOM parser dependencies
    const resultBlockRegex = /<div class="result\s+results_links[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
    let match;

    while ((match = resultBlockRegex.exec(html)) !== null && results.length < 5) {
      const block = match[1];

      // Extract raw link from DuckDuckGo wrapper
      const linkMatch = block.match(/href="([^"]*uddg=([^"&]+)[^"]*)"/i) || block.match(/href="([^"]*linkedin\.com\/in\/[^"]*)"/i);
      let rawUrl = '';

      if (linkMatch) {
        if (linkMatch[2]) {
          try {
            rawUrl = decodeURIComponent(linkMatch[2]);
          } catch {
            rawUrl = linkMatch[2];
          }
        } else {
          rawUrl = linkMatch[1];
        }
      }

      if (!rawUrl.includes('linkedin.com/in/')) {
        continue;
      }

      // Clean LinkedIn URL (remove query parameters)
      const cleanUrl = rawUrl.split('?')[0].replace(/\/+$/, '');

      // Extract title text: e.g. "John Doe - Chief Technology Officer - Acme Corp | LinkedIn"
      const titleMatch = block.match(/<a class="result__url"[^>]*>([\s\S]*?)<\/a>/i) ||
                         block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i) ||
                         block.match(/<h2 class="result__title">([\s\S]*?)<\/h2>/i);

      const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i);

      const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      // Parse Name and Designation from LinkedIn format: "Name - Title - Company | LinkedIn"
      const parsed = parseLinkedInTitle(rawTitle, snippet, company, targetTitle);

      if (parsed.name && !results.some(r => r.linkedinUrl === cleanUrl)) {
        results.push({
          name: parsed.name,
          verifiedTitle: parsed.title || targetTitle,
          company: company,
          linkedinUrl: cleanUrl,
          headline: snippet || parsed.title,
          location: parsed.location || 'India / Global',
          confidence: parsed.isHighConfidence ? 'HIGH' : 'MEDIUM',
          source: 'DuckDuckGo Proxy (Free)',
        });
      }
    }

    return results;
  } catch (e) {
    console.warn('DuckDuckGo proxy error, proceeding to fallback:', e);
    return [];
  }
}

// -------------------------------------------------------------
// Helper: Parse Person Name & Role from SERP Snippet
// -------------------------------------------------------------
function parseLinkedInTitle(rawTitle: string, snippet: string, company: string, targetTitle: string) {
  // Common formats:
  // "Satya Nadella - Chairman and Chief Executive Officer - Microsoft | LinkedIn"
  // "Deepinder Goyal - Founder & CEO - Zomato | LinkedIn"
  let clean = rawTitle.replace(/\|\s*LinkedIn/i, '').replace(/-\s*LinkedIn/i, '').trim();
  const parts = clean.split(/[-–—|]/).map(p => p.trim()).filter(Boolean);

  let name = '';
  let title = '';
  let location = '';

  if (parts.length >= 2) {
    name = parts[0];
    title = parts[1];
  } else if (parts.length === 1) {
    name = parts[0];
    title = targetTitle;
  }

  // Sanitize name (remove designations that crept into name)
  name = name.replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, '').trim();

  // If snippet contains location
  const locMatch = snippet.match(/Location:\s*([A-Za-z\s,]+?)(?:\s*·|\s*\.|\s*Experience|$)/i) ||
                   snippet.match(/([A-Za-z\s]+,\s*(?:India|United States|UK|Canada|Singapore|Dubai|Bengaluru|Mumbai|Delhi))/i);
  if (locMatch) {
    location = locMatch[1].trim();
  }

  // Check if title or snippet closely matches targetTitle
  const isHighConfidence =
    title.toLowerCase().includes(targetTitle.toLowerCase()) ||
    snippet.toLowerCase().includes(targetTitle.toLowerCase()) ||
    rawTitle.toLowerCase().includes(company.toLowerCase());

  return {
    name: name || 'Executive Lead',
    title: title || targetTitle,
    location,
    isHighConfidence,
  };
}

// -------------------------------------------------------------
// Priority 2A: Serper.dev Google SERP Fallback
// -------------------------------------------------------------
async function searchSerper(company: string, targetTitle: string, apiKey: string): Promise<SearchResultItem[]> {
  try {
    const query = `site:linkedin.com/in "${company}" "${targetTitle}"`;
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num: 5 }),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const organic = data.organic || [];
    const results: SearchResultItem[] = [];

    for (const item of organic) {
      if (item.link?.includes('linkedin.com/in/')) {
        const cleanUrl = item.link.split('?')[0];
        const parsed = parseLinkedInTitle(item.title || '', item.snippet || '', company, targetTitle);

        results.push({
          name: parsed.name,
          verifiedTitle: parsed.title,
          company,
          linkedinUrl: cleanUrl,
          headline: item.snippet || parsed.title,
          confidence: 'HIGH',
          source: 'Google Serper',
        });
      }
    }

    return results;
  } catch (err) {
    console.warn('Serper search fallback error:', err);
    return [];
  }
}

// -------------------------------------------------------------
// Priority 2B: Google Gemini Grounding Fallback
// -------------------------------------------------------------
async function searchGeminiGrounding(company: string, targetTitle: string, apiKey: string): Promise<SearchResultItem[]> {
  try {
    const prompt = `Find the LinkedIn profile URL, full name, and verified designation of the person who is currently the "${targetTitle}" at "${company}". If there are multiple matching people (e.g. Co-founders), provide all of them. Respond strictly in JSON array format: [{"name": string, "verifiedTitle": string, "linkedinUrl": string, "location": string}]. If not found, return empty array [].`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
      }),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.map((item: any) => ({
        name: item.name || 'Executive',
        verifiedTitle: item.verifiedTitle || targetTitle,
        company,
        linkedinUrl: item.linkedinUrl || `https://www.linkedin.com/company/${encodeURIComponent(company.toLowerCase())}/people/`,
        location: item.location || 'Global',
        confidence: 'HIGH',
        source: 'Gemini Search',
      }));
    }

    return [];
  } catch (err) {
    console.warn('Gemini grounding fallback error:', err);
    return [];
  }
}
