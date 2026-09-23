import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parser = new PDFParse({ data: buffer });
    const parsedData = await parser.getText();
    const rawText = parsedData.text || '';

    if (!rawText.trim()) {
      return NextResponse.json({
        success: false,
        error: 'PDF appears to be empty or contains only scanned images without selectable text.',
      }, { status: 400 });
    }

    // Smart heuristic parser to extract Company and Title from structured or unstructured text
    const extractedPairs = extractCompanyTitlePairs(rawText);

    return NextResponse.json({
      success: true,
      filename: file.name,
      pageCount: parsedData.total || 1,
      totalExtracted: extractedPairs.length,
      items: extractedPairs,
    });
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to parse PDF document.',
    }, { status: 500 });
  }
}

interface ExtractedItem {
  id: string;
  company: string;
  targetTitle: string;
  sourceLine?: string;
}

function extractCompanyTitlePairs(text: string): ExtractedItem[] {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 2);

  const results: ExtractedItem[] = [];
  const seen = new Set<string>();

  // Common executive titles and keywords
  const titleKeywords = [
    'founder', 'co-founder', 'cofounder', 'director', 'managing director', 'md',
    'it head', 'head of it', 'cto', 'chief technology officer', 'ceo', 'chief executive officer',
    'cfo', 'chief financial officer', 'coo', 'chief operating officer', 'cmo', 'chief marketing officer',
    'vp', 'vice president', 'president', 'head of engineering', 'tech lead', 'hr head', 'head of hr',
    'general manager', 'partner', 'principal', 'chairman', 'board member', 'lead architect'
  ];

  // Pattern 1: Delimited lines (CSV / TSV / pipe / hyphen / colon)
  // e.g.: "Tata Consultancy Services | CTO" or "Infosys, IT Head" or "Zomato - Founder"
  for (const line of lines) {
    // Skip obvious header rows
    if (/^(company|organization|firm|business|name)\s*[,|\t-]\s*(title|designation|role|position)/i.test(line)) {
      continue;
    }

    const delimiters = ['\t', '|', ';', ',', ' - ', ' – ', ' : '];
    let matched = false;

    for (const d of delimiters) {
      if (line.includes(d)) {
        const parts = line.split(d).map(p => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          const partA = parts[0];
          const partB = parts[1];

          // Check if partA or partB contains a known title keyword
          const isBTitle = titleKeywords.some(kw => partB.toLowerCase().includes(kw));
          const isATitle = titleKeywords.some(kw => partA.toLowerCase().includes(kw));

          let company = '';
          let title = '';

          if (isBTitle) {
            company = cleanEntity(partA);
            title = cleanEntity(partB);
          } else if (isATitle) {
            company = cleanEntity(partB);
            title = cleanEntity(partA);
          } else if (parts.length === 2 && partA.length < 50 && partB.length < 50) {
            // Fallback assumption: Column 1 = Company, Column 2 = Title
            company = cleanEntity(partA);
            title = cleanEntity(partB);
          }

          if (company && title && company.length > 1 && title.length > 1) {
            const key = `${company.toLowerCase()}___${title.toLowerCase()}`;
            if (!seen.has(key)) {
              seen.add(key);
              results.push({
                id: `item-${results.length + 1}-${Date.now().toString(36)}`,
                company,
                targetTitle: title,
                sourceLine: line,
              });
              matched = true;
              break;
            }
          }
        }
      }
    }

    if (matched) continue;

    // Pattern 2: Natural language regex:
    // e.g., "Founder of Acme Corp", "Director at Reliance Industries", "IT Head for Infosys"
    const naturalRegex = /(?:the\s+)?([A-Za-z\s&-]+?)\s+(?:at|of|for|in)\s+([A-Za-z0-9\s&.,'-]+)/i;
    const natMatch = line.match(naturalRegex);
    if (natMatch) {
      const candidateTitle = natMatch[1].trim();
      const candidateCompany = natMatch[2].replace(/[.,;]$/, '').trim();

      const isKnownTitle = titleKeywords.some(kw => candidateTitle.toLowerCase().includes(kw));
      if (isKnownTitle && candidateCompany.length > 2 && candidateCompany.length < 60) {
        const key = `${candidateCompany.toLowerCase()}___${candidateTitle.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            id: `item-${results.length + 1}-${Date.now().toString(36)}`,
            company: cleanEntity(candidateCompany),
            targetTitle: cleanEntity(candidateTitle),
            sourceLine: line,
          });
        }
      }
    }
  }

  // If few or no results found from delimiters, attempt multi-line consecutive pair detection
  if (results.length === 0 && lines.length >= 2) {
    for (let i = 0; i < lines.length - 1; i += 2) {
      const line1 = cleanEntity(lines[i]);
      const line2 = cleanEntity(lines[i + 1]);
      if (line1 && line2 && line1.length < 60 && line2.length < 60) {
        const key = `${line1.toLowerCase()}___${line2.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            id: `item-${results.length + 1}-${Date.now().toString(36)}`,
            company: line1,
            targetTitle: line2,
          });
        }
      }
    }
  }

  return results;
}

function cleanEntity(str: string): string {
  return str
    .replace(/^["'(\[]+|["')\]]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
