"use client";
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileText, Download, FileSpreadsheet, Eye, X, CheckCircle2, ExternalLink } from 'lucide-react';
import { VerifiedExecutive } from './VerificationTable';

interface PdfReportPreviewProps {
  items: VerifiedExecutive[];
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfReportPreview({ items, isOpen, onClose }: PdfReportPreviewProps) {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      generatePdfPreview();
    }
    return () => {
      if (pdfDataUrl) {
        URL.revokeObjectURL(pdfDataUrl);
      }
    };
  }, [isOpen, items]);

  const generatePdfBlob = (): Blob => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header Background
    doc.setFillColor(8, 16, 33); // #081021 Navy
    doc.rect(0, 0, pageWidth, 75, 'F');

    // Title & Branding
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('SPONSORA EXECUTIVE INTELLIGENCE REPORT', 40, 36);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(6, 182, 212); // Cyan #06B6D4
    doc.text('Verified Corporate Leadership & LinkedIn Profiles Directory', 40, 52);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // Slate 400
    const dateStr = `Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · Total Records: ${items.length}`;
    doc.text(dateStr, pageWidth - 40, 44, { align: 'right' });

    // Table Data preparation (Strictly: Company Name | Verified Title | Executive Name | LinkedIn Profile URL)
    const tableRows = items.map((item, index) => [
      String(index + 1),
      item.company,
      item.verifiedTitle || item.targetTitle,
      item.verifiedName,
      item.linkedinUrl,
    ]);

    // Render AutoTable
    autoTable(doc, {
      startY: 90,
      head: [['#', 'Company Name', 'Verified Designation', 'Executive Name', 'Verified LinkedIn URL']],
      body: tableRows,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 6,
        font: 'helvetica',
        lineColor: [226, 232, 240],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [15, 23, 42], // Slate 900
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9.5,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 30, halign: 'center' },
        1: { cellWidth: 160, fontStyle: 'bold' },
        2: { cellWidth: 150 },
        3: { cellWidth: 150, fontStyle: 'bold' },
        4: { cellWidth: 270, textColor: [3, 105, 161] }, // Blue hyperlink look
      },
      didDrawCell: (data) => {
        // Make the LinkedIn URL clickable in the generated PDF
        if (data.section === 'body' && data.column.index === 4 && data.cell.text.length > 0) {
          const rawUrl = items[data.row.index]?.linkedinUrl;
          if (rawUrl && rawUrl.startsWith('http')) {
            doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: rawUrl });
          }
        }
      },
      margin: { top: 90, left: 40, right: 40, bottom: 40 },
    });

    // Footer on all pages
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Confidential · Sponsora Automation · Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 18,
        { align: 'center' }
      );
    }

    return doc.output('blob');
  };

  const generatePdfPreview = () => {
    setIsGenerating(true);
    try {
      const blob = generatePdfBlob();
      const url = URL.createObjectURL(blob);
      setPdfDataUrl(url);
    } catch (e) {
      console.error('Failed to generate PDF blob:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    const blob = generatePdfBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sponsora_Verified_Executives_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    const headers = ['#', 'Company Name', 'Target Designation', 'Verified Executive Name', 'Verified Designation', 'LinkedIn URL', 'Confidence', 'Source'];
    const rows = items.map((item, idx) => [
      idx + 1,
      `"${item.company.replace(/"/g, '""')}"`,
      `"${item.targetTitle.replace(/"/g, '""')}"`,
      `"${item.verifiedName.replace(/"/g, '""')}"`,
      `"${(item.verifiedTitle || item.targetTitle).replace(/"/g, '""')}"`,
      `"${item.linkedinUrl}"`,
      `"${item.confidence}"`,
      `"${item.source}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sponsora_Executives_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Final Verified Report Preview</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                  {items.length} Records Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                In-browser document preview. You can view/read it here or export directly below.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleDownloadCsv}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all hover:scale-105"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              1-Click CSV
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download Final PDF
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded In-Browser PDF Preview */}
        <div className="flex-1 w-full h-full bg-slate-950 relative">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
              <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold">Compiling high-resolution PDF document...</p>
            </div>
          ) : pdfDataUrl ? (
            <iframe
              src={`${pdfDataUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full border-none"
              title="Verified PDF Document Preview"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              No preview available.
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Verified format: Company Name · Verified Title · Executive Name · Direct LinkedIn URL
          </span>
          <button 
            onClick={onClose}
            className="text-cyan-400 hover:underline font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
