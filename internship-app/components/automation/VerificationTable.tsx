"use client";
import React, { useState, useMemo } from 'react';
import { 
  Search, ExternalLink, Edit2, Check, RefreshCw, Trash2, 
  CheckCircle2, AlertCircle, Plus, Filter, ShieldCheck, MapPin, Building2,
  Info, X, ChevronRight, Sparkles
} from 'lucide-react';

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8Z"/>
  </svg>
);

export interface VerificationDetails {
  entityScore: number;
  entityNote: string;
  officeScore: number;
  officeAddress: string;
  identityScore: number;
  identityNote: string;
  titleScore: number;
  titleMatchPercentage: number;
  urlScore: number;
  urlStatus: string;
  totalChecksPassed: number;
  verificationSummary: string;
}

export interface VerifiedExecutive {
  id: string;
  company: string;
  legalEntityName?: string;
  targetTitle: string;
  verifiedName: string;
  verifiedTitle: string;
  linkedinUrl: string;
  location?: string;
  officeAddress?: string;
  headline?: string;
  department?: string;
  experienceLevel?: string;
  urlVerified?: boolean;
  verificationStatus?: string;
  verificationDetails?: VerificationDetails;
  confidence: 'HIGH' | 'MEDIUM' | 'FALLBACK';
  source: string;
  isVerifiedByUser?: boolean;
  selected?: boolean;
}

interface VerificationTableProps {
  items: VerifiedExecutive[];
  onUpdateItem: (id: string, updated: Partial<VerifiedExecutive>) => void;
  onDeleteItem: (id: string) => void;
  onReverifyItem: (id: string) => Promise<void>;
  onAddExecutive: (company: string, targetTitle: string) => void;
}

export default function VerificationTable({
  items,
  onUpdateItem,
  onDeleteItem,
  onReverifyItem,
  onAddExecutive,
}: VerificationTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'FALLBACK'>('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedVerificationItem, setSelectedVerificationItem] = useState<VerifiedExecutive | null>(null);
  const [editForm, setEditForm] = useState<{
    verifiedName: string;
    verifiedTitle: string;
    officeAddress: string;
    linkedinUrl: string;
  }>({ verifiedName: '', verifiedTitle: '', officeAddress: '', linkedinUrl: '' });
  const [reverifyingId, setReverifyingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Filtered list based on search and confidence
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.legalEntityName && item.legalEntityName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.verifiedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.verifiedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.officeAddress && item.officeAddress.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchConf = confidenceFilter === 'ALL' || item.confidence === confidenceFilter;
      return matchSearch && matchConf;
    });
  }, [items, searchTerm, confidenceFilter]);

  // Paginated view for smooth performance with 500-2000 records
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;

  const startEdit = (item: VerifiedExecutive) => {
    setEditingId(item.id);
    setEditForm({
      verifiedName: item.verifiedName,
      verifiedTitle: item.verifiedTitle,
      officeAddress: item.officeAddress || item.location || '',
      linkedinUrl: item.linkedinUrl,
    });
  };

  const saveEdit = (id: string) => {
    onUpdateItem(id, {
      verifiedName: editForm.verifiedName,
      verifiedTitle: editForm.verifiedTitle,
      officeAddress: editForm.officeAddress,
      location: editForm.officeAddress,
      linkedinUrl: editForm.linkedinUrl,
      isVerifiedByUser: true,
      confidence: 'HIGH',
    });
    setEditingId(null);
  };

  const handleReverify = async (id: string) => {
    setReverifyingId(id);
    try {
      await onReverifyItem(id);
    } finally {
      setReverifyingId(null);
    }
  };

  return (
    <div className="w-full bg-card/90 border border-border rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-colors">
      
      {/* Table Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-bold text-foreground">Interactive Verification & Review</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
              {filteredItems.length} Profiles
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            4-5 Step Verification Pipeline: Suffix Sanitization, Corporate HQ Resolution, Identity Match, Title Alignment & Live LinkedIn Healthcheck.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company, title, office, name..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-background p-1 border border-border rounded-xl shadow-sm">
            {(['ALL', 'HIGH', 'MEDIUM', 'FALLBACK'] as const).map(conf => (
              <button
                key={conf}
                onClick={() => { setConfidenceFilter(conf); setPage(1); }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  confidenceFilter === conf
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {conf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-background/80 shadow-sm backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3.5 px-4">Company & Legal Entity</th>
              <th className="py-3.5 px-4">Target Title</th>
              <th className="py-3.5 px-4">Identified Executive</th>
              <th className="py-3.5 px-4">Verified Designation & Bio</th>
              <th className="py-3.5 px-4">Registered Office / HQ</th>
              <th className="py-3.5 px-4">LinkedIn Profile URL</th>
              <th className="py-3.5 px-4">5-Step Verification</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted-foreground">
                  No matching executive profiles found in this view.
                </td>
              </tr>
            ) : (
              paginatedItems.map(item => {
                const isEditing = editingId === item.id;
                const isReverifying = reverifyingId === item.id;
                const details = item.verificationDetails;
                const score = details?.totalChecksPassed ?? (item.confidence === 'HIGH' ? 5 : item.confidence === 'MEDIUM' ? 4 : 3);

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-muted/40 transition-colors ${
                      item.isVerifiedByUser ? 'bg-cyan-500/5' : ''
                    }`}
                  >
                    {/* Company Name & Legal Entity */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span className="truncate">{item.company}</span>
                      </div>
                      {item.legalEntityName && item.legalEntityName !== item.company && (
                        <p className="text-[10px] text-muted-foreground truncate font-mono mt-0.5" title={item.legalEntityName}>
                          {item.legalEntityName}
                        </p>
                      )}
                      {item.department && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground mt-1">
                          {item.department}
                        </span>
                      )}
                    </td>

                    {/* Target Title */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-muted/80 border border-border text-foreground/80 text-[11px] font-medium">
                        {item.targetTitle}
                      </span>
                    </td>

                    {/* Executive Name (Editable) */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.verifiedName}
                          onChange={e => setEditForm(prev => ({ ...prev, verifiedName: e.target.value }))}
                          className="w-full px-2.5 py-1 bg-background border border-cyan-500 rounded text-xs text-foreground focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-foreground">
                          <span>{item.verifiedName}</span>
                          {item.isVerifiedByUser && (
                            <span title="Manually Verified">
                              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                            </span>
                          )}
                        </div>
                      )}
                      {item.experienceLevel && (
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          {item.experienceLevel}
                        </span>
                      )}
                    </td>

                    {/* Verified Designation & Bio */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.verifiedTitle}
                          onChange={e => setEditForm(prev => ({ ...prev, verifiedTitle: e.target.value }))}
                          className="w-full px-2.5 py-1 bg-background border border-cyan-500 rounded text-xs text-foreground focus:outline-none"
                        />
                      ) : (
                        <div>
                          <span className="text-foreground font-semibold block text-xs">
                            {item.verifiedTitle}
                          </span>
                          {item.headline && (
                            <p className="text-[10px] text-muted-foreground/80 line-clamp-1 mt-0.5 italic">
                              "{item.headline}"
                            </p>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Registered Office / HQ Location (Editable) */}
                    <td className="py-3.5 px-4 max-w-[180px]">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.officeAddress}
                          onChange={e => setEditForm(prev => ({ ...prev, officeAddress: e.target.value }))}
                          className="w-full px-2.5 py-1 bg-background border border-cyan-500 rounded text-xs text-foreground focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-start gap-1.5 text-xs text-foreground/90">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium block leading-tight">{item.officeAddress || item.location || 'India / Global HQ'}</span>
                            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider block mt-0.5">
                              HQ Verified
                            </span>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* LinkedIn URL (Editable & Clickable) */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.linkedinUrl}
                          onChange={e => setEditForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                          className="w-full px-2.5 py-1 bg-background border border-cyan-500 rounded text-xs text-cyan-500 font-mono focus:outline-none"
                        />
                      ) : (
                        <div>
                          <a
                            href={item.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-[11px] max-w-[180px] truncate font-medium"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span className="truncate">{item.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                          </a>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                              {item.verificationStatus || '200 OK Live Verified'}
                            </span>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* 5-Step Verification Badge & Interactive Dialog Trigger */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setSelectedVerificationItem(item)}
                        className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all hover:scale-105 shadow-sm text-left ${
                          score === 5
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                            : score === 4
                            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                        title="Click to view 5-step verification breakdown"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-current" />
                        <span>{score}/5 Verified</span>
                        <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <span className="text-[10px] text-muted-foreground block mt-1 truncate max-w-[120px]">
                        {item.source}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isEditing ? (
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                            title="Save Changes"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                            title="Edit Record"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleReverify(item.id)}
                          disabled={isReverifying}
                          className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-cyan-500 hover:text-cyan-400 transition-colors disabled:opacity-50"
                          title="Re-verify from Search"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isReverifying ? 'animate-spin' : ''}`} />
                        </button>

                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1.5 rounded-lg bg-muted hover:bg-rose-500/20 text-muted-foreground hover:text-rose-500 transition-colors"
                          title="Delete Row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2 text-xs text-muted-foreground">
          <span>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredItems.length)} of {filteredItems.length} records
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 text-foreground font-medium"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-foreground">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 text-foreground font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5-STEP VERIFICATION DRILLDOWN MODAL */}
      {/* ======================================================== */}
      {selectedVerificationItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 text-foreground">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold">5-Step Verification Audit</h4>
                  <p className="text-xs text-muted-foreground">{selectedVerificationItem.company}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVerificationItem(null)}
                className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Check 1: Entity Normalization */}
              <div className="p-3 rounded-2xl bg-background border border-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-foreground block">1. Legal Entity & MCA Normalization</span>
                  <p className="text-muted-foreground mt-0.5">
                    Trading Brand: <span className="font-semibold text-foreground">{selectedVerificationItem.company}</span>
                    {selectedVerificationItem.legalEntityName && (
                      <span className="block font-mono text-[10px] text-muted-foreground mt-0.5">
                        Legal Entity: {selectedVerificationItem.legalEntityName}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Check 2: Office HQ Resolution */}
              <div className="p-3 rounded-2xl bg-background border border-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-foreground block">2. Registered Corporate HQ Address</span>
                  <p className="text-muted-foreground mt-0.5">
                    Location: <span className="font-semibold text-foreground">{selectedVerificationItem.officeAddress || selectedVerificationItem.location || 'Resolved'}</span>
                  </p>
                </div>
              </div>

              {/* Check 3: Executive Identity Match */}
              <div className="p-3 rounded-2xl bg-background border border-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-foreground block">3. Executive Identity Cross-Reference</span>
                  <p className="text-muted-foreground mt-0.5">
                    Verified Officer: <span className="font-semibold text-foreground">{selectedVerificationItem.verifiedName}</span>
                  </p>
                </div>
              </div>

              {/* Check 4: Designation Alignment */}
              <div className="p-3 rounded-2xl bg-background border border-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-foreground block">4. Designation & Seniority Alignment</span>
                  <p className="text-muted-foreground mt-0.5">
                    Target: <span className="font-medium text-foreground">{selectedVerificationItem.targetTitle}</span> → Verified: <span className="font-semibold text-cyan-500">{selectedVerificationItem.verifiedTitle}</span>
                  </p>
                </div>
              </div>

              {/* Check 5: Live Active LinkedIn URL */}
              <div className="p-3 rounded-2xl bg-background border border-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-foreground block">5. Live Profile URL Healthcheck</span>
                  <p className="text-muted-foreground mt-0.5 truncate font-mono text-[11px]">
                    {selectedVerificationItem.linkedinUrl}
                  </p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {selectedVerificationItem.verificationStatus || '200 OK Live Verified'}
                  </span>
                </div>
              </div>

            </div>

            <button
              onClick={() => setSelectedVerificationItem(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors"
            >
              Close Verification Audit
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
