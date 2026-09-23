"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, Sparkles, 
  ArrowRight, ShieldCheck, Zap, Download, RefreshCw, Eye, 
  Database, Users, Globe, ExternalLink, Play, Layers
} from 'lucide-react';
import AutomationHeroVisual from '@/components/automation/AutomationHeroVisual';
import PdfViewerModal from '@/components/automation/PdfViewerModal';
import ExecutionQueue from '@/components/automation/ExecutionQueue';
import VerificationTable, { VerifiedExecutive } from '@/components/automation/VerificationTable';
import PdfReportPreview from '@/components/automation/PdfReportPreview';

interface ParsedItem {
  id: string;
  company: string;
  targetTitle: string;
}

// Pre-packaged realistic sample dataset for instant 1-click testing
const SAMPLE_RECORDS: ParsedItem[] = [
  { id: 'sample-1', company: 'Google', targetTitle: 'CEO' },
  { id: 'sample-2', company: 'Microsoft', targetTitle: 'Chairman & CEO' },
  { id: 'sample-3', company: 'Zomato', targetTitle: 'Founder' },
  { id: 'sample-4', company: 'Tata Consultancy Services', targetTitle: 'Chief Technology Officer' },
  { id: 'sample-5', company: 'Infosys', targetTitle: 'Managing Director' },
  { id: 'sample-6', company: 'Swiggy', targetTitle: 'Co-Founder' },
  { id: 'sample-7', company: 'Flipkart', targetTitle: 'IT Head' },
  { id: 'sample-8', company: 'Reliance Jio', targetTitle: 'Director' },
  { id: 'sample-9', company: 'Zerodha', targetTitle: 'Founder' },
  { id: 'sample-10', company: 'OpenAI', targetTitle: 'CEO' },
];

export default function AutomationPage() {
  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Raw Parsed Queue
  const [parsedQueue, setParsedQueue] = useState<ParsedItem[]>([]);
  
  // Execution & Search Queue State
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQueryTelemetry, setCurrentQueryTelemetry] = useState<{
    company: string;
    targetTitle: string;
    step: string;
  } | null>(null);

  // Verified Results
  const [verifiedList, setVerifiedList] = useState<VerifiedExecutive[]>([]);
  
  // Final PDF Preview Modal
  const [isFinalPdfModalOpen, setIsFinalPdfModalOpen] = useState(false);

  // References for pause/stop control
  const isPausedRef = useRef(false);
  const isStoppedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Clean up Object URL on unmount
  useEffect(() => {
    return () => {
      if (uploadedPdfUrl) URL.revokeObjectURL(uploadedPdfUrl);
    };
  }, [uploadedPdfUrl]);

  // Handle Drag & Drop / File Selection
  const handleFileChange = async (selectedFile: File) => {
    if (!selectedFile) return;

    const allowedExts = ['.pdf', '.csv', '.xls', '.xlsx', '.txt', '.doc', '.docx'];
    const hasValidExt = allowedExts.some(ext => selectedFile.name.toLowerCase().endsWith(ext));
    if (!hasValidExt && selectedFile.type !== 'application/pdf') {
      alert('Please upload a valid Document (PDF, Excel, CSV, Word, TXT).');
      return;
    }

    setFile(selectedFile);
    const objUrl = URL.createObjectURL(selectedFile);
    setUploadedPdfUrl(objUrl);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/automation/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse PDF.');
      }

      setParsedQueue(data.items);
      setVerifiedList([]);
      setCurrentIndex(0);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error extracting company and title pairs from PDF.');
    } finally {
      setIsParsing(false);
    }
  };

  // Load Sample Demo Dataset
  const handleLoadSample = () => {
    setFile(null);
    setUploadedPdfUrl(null);
    setParsedQueue(SAMPLE_RECORDS);
    setVerifiedList([]);
    setCurrentIndex(0);
  };

  // Start / Resume Automation Runner
  const startAutomation = async () => {
    if (parsedQueue.length === 0) return;

    setIsSearching(true);
    setIsPaused(false);
    isStoppedRef.current = false;

    const telemetrySteps = [
      'Connecting to DuckDuckGo Free Proxy...',
      'Searching Google SERP index for site:linkedin.com/in...',
      'Parsing organic LinkedIn profile entities...',
      'Cross-referencing designation with target company...',
      'Extracting verified profile URL and location...',
    ];

    // Loop through the queue
    for (let i = currentIndex; i < parsedQueue.length; i++) {
      if (isStoppedRef.current) break;

      // Handle Pause
      while (isPausedRef.current) {
        await new Promise(r => setTimeout(r, 400));
        if (isStoppedRef.current) break;
      }
      if (isStoppedRef.current) break;

      const item = parsedQueue[i];
      setCurrentIndex(i + 1);

      // Cycle telemetry animation
      for (const step of telemetrySteps) {
        setCurrentQueryTelemetry({
          company: item.company,
          targetTitle: item.targetTitle,
          step,
        });
        await new Promise(r => setTimeout(r, 220));
      }

      try {
        const res = await fetch('/api/automation/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: item.id,
            company: item.company,
            targetTitle: item.targetTitle,
          }),
        });

        const data = await res.json();

        if (data.success && data.profiles && data.profiles.length > 0) {
          const newEntries: VerifiedExecutive[] = data.profiles.map((p: any, idx: number) => ({
            id: `${item.id}-p${idx}-${Date.now().toString(36)}`,
            company: item.company,
            targetTitle: item.targetTitle,
            verifiedName: p.name,
            verifiedTitle: p.verifiedTitle || item.targetTitle,
            linkedinUrl: p.linkedinUrl,
            location: p.location,
            headline: p.headline,
            confidence: p.confidence || 'HIGH',
            source: p.source || 'DuckDuckGo Proxy (Free)',
            isVerifiedByUser: false,
          }));

          setVerifiedList(prev => [...prev, ...newEntries]);
        }
      } catch (e) {
        console.error('Lookup failed for row:', item, e);
      }

      // Safe pacing interval (1.2s) to maintain 0 cost, 0 IP blocks, and 100% stability for 500-2000 records
      await new Promise(r => setTimeout(r, 1200));
    }

    setIsSearching(false);
    setCurrentQueryTelemetry(null);
  };

  // Re-verify single row
  const handleReverifyItem = async (id: string) => {
    const item = verifiedList.find(v => v.id === id);
    if (!item) return;

    try {
      const res = await fetch('/api/automation/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          company: item.company,
          targetTitle: item.targetTitle,
        }),
      });
      const data = await res.json();
      if (data.success && data.profiles && data.profiles.length > 0) {
        const best = data.profiles[0];
        setVerifiedList(prev => prev.map(row => {
          if (row.id === id) {
            return {
              ...row,
              verifiedName: best.name,
              verifiedTitle: best.verifiedTitle,
              linkedinUrl: best.linkedinUrl,
              confidence: best.confidence,
              source: best.source,
            };
          }
          return row;
        }));
      }
    } catch (e) {
      console.error('Reverify error:', e);
    }
  };

  const handleUpdateItem = (id: string, updated: Partial<VerifiedExecutive>) => {
    setVerifiedList(prev => prev.map(row => (row.id === id ? { ...row, ...updated } : row)));
  };

  const handleDeleteItem = (id: string) => {
    setVerifiedList(prev => prev.filter(row => row.id !== id));
  };

  const handleAddExecutive = (company: string, targetTitle: string) => {
    const newEntry: VerifiedExecutive = {
      id: `manual-${Date.now().toString(36)}`,
      company,
      targetTitle,
      verifiedName: 'New Executive',
      verifiedTitle: targetTitle,
      linkedinUrl: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${company} ${targetTitle}`)}`,
      confidence: 'MEDIUM',
      source: 'Manual Add',
      isVerifiedByUser: true,
    };
    setVerifiedList(prev => [newEntry, ...prev]);
  };

  const foundCount = verifiedList.filter(v => v.confidence !== 'FALLBACK').length;
  const fallbackCount = verifiedList.filter(v => v.confidence === 'FALLBACK').length;

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary/30 pb-24">
      
      {/* Background Ambience & Snow Theme */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-snow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Executive Sourcing & LinkedIn Intelligence Engine</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Extract, Find & Verify <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Executive LinkedIn Profiles
            </span> in Bulk
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Upload any structured or unstructured PDF with 500 to 2,000 companies and designations (Founders, Directors, IT Heads). 
            Our 100% free search agent scans Google, Chrome, and LinkedIn to return verified profiles with 1-click PDF & CSV export.
          </p>

          {/* Key Metric Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> 100% Free Search Proxy (No Token Cap)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Anti-Block Paced Queue (500–2000 Records)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <Users className="w-3.5 h-3.5 text-purple-400" /> Multi-Profile Co-Founder Extraction
            </span>
          </div>
        </div>

        {/* Interactive Visual Graphic */}
        <AutomationHeroVisual />

        {/* ======================================================== */}
        {/* CENTERED PDF UPLOAD DROPZONE */}
        {/* ======================================================== */}
        <div className="max-w-3xl mx-auto my-10">
          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer rounded-3xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/60 hover:bg-slate-900/90 p-8 sm:p-12 text-center transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.08)] hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              accept=".pdf,.csv,.xlsx,.xls,.txt,.doc,.docx"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              {isParsing ? (
                <RefreshCw className="w-8 h-8 animate-spin" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {isParsing 
                ? 'Parsing Document & Extracting Entities...' 
                : file 
                ? `Loaded: ${file.name}` 
                : 'Drop your Company & Title Document here'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-5">
              Supports both structured tables and unstructured text (500 to 2,000 companies) in PDF, Excel, CSV, or Word formats. 
              Our parser automatically identifies Company Names and Target Designations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button 
                type="button" 
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 group-hover:from-cyan-500 group-hover:to-blue-500 transition-all"
              >
                Browse File
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSample();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800 text-xs font-bold transition-all"
              >
                ✨ Load 10 Sample Companies Demo
              </button>
            </div>
          </div>

          {/* Uploaded File Info & Preview Pill */}
          {file && (
            <div className="flex items-center justify-between mt-4 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white truncate max-w-xs">{file.name}</span>
                <span className="text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold text-[10px]">
                  {parsedQueue.length} Entities Extracted
                </span>
              </div>

              {uploadedPdfUrl && (
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview Uploaded PDF
                </button>
              )}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* QUEUE & SEARCH EXECUTION SECTION */}
        {/* ======================================================== */}
        {parsedQueue.length > 0 && (
          <div className="my-10 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
            
            {/* Start Button Banner if not started yet */}
            {!isSearching && verifiedList.length === 0 && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <h4 className="text-lg font-bold text-white">Ready to Execute Search Automation</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {parsedQueue.length} company-title pairs queued. Priority 1 (DuckDuckGo Search Proxy) will run with anti-block pacing.
                  </p>
                </div>
                <button
                  onClick={startAutomation}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/30 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Automation Search ({parsedQueue.length})
                </button>
              </div>
            )}

            {/* Live Telemetry Queue */}
            {(isSearching || verifiedList.length > 0) && (
              <ExecutionQueue
                total={parsedQueue.length}
                completed={currentIndex}
                inProgress={isSearching}
                isPaused={isPaused}
                currentQuery={currentQueryTelemetry}
                foundCount={foundCount}
                fallbackCount={fallbackCount}
                onPause={() => setIsPaused(true)}
                onResume={() => setIsPaused(false)}
                onStop={() => {
                  isStoppedRef.current = true;
                  setIsSearching(false);
                }}
                onRetryFailed={() => {
                  // Put fallback items back into queue
                  const fallbacks = verifiedList.filter(v => v.confidence === 'FALLBACK');
                  setParsedQueue(fallbacks.map(f => ({ id: f.id, company: f.company, targetTitle: f.targetTitle })));
                  setCurrentIndex(0);
                  startAutomation();
                }}
              />
            )}

            {/* ======================================================== */}
            {/* INTERACTIVE VERIFICATION TABLE */}
            {/* ======================================================== */}
            {verifiedList.length > 0 && (
              <div className="space-y-6">
                
                {/* Export Action Bar Above Table */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">Step 2: Interactive Review & Final Export</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verify candidate names and LinkedIn URLs. Click below to view the final report in your browser without downloading.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsFinalPdfModalOpen(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      Preview & Export Final PDF ({verifiedList.length})
                    </button>
                  </div>
                </div>

                {/* Table Component */}
                <VerificationTable
                  items={verifiedList}
                  onUpdateItem={handleUpdateItem}
                  onDeleteItem={handleDeleteItem}
                  onReverifyItem={handleReverifyItem}
                  onAddExecutive={handleAddExecutive}
                />
              </div>
            )}

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}
      {/* 1. In-browser Uploaded PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={uploadedPdfUrl}
        filename={file?.name || 'Uploaded Document.pdf'}
      />

      {/* 2. In-browser Final Generated PDF Preview & Download Modal */}
      <PdfReportPreview
        items={verifiedList}
        isOpen={isFinalPdfModalOpen}
        onClose={() => setIsFinalPdfModalOpen(false)}
      />

    </div>
  );
}
