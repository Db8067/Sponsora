import React from 'react';
import { Check, X, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';

// Mock data
const VENDOR_APPLICATIONS = [
  { id: '1', name: 'TechHaven India', owner: 'Rahul Sharma', date: '2026-07-08', status: 'pending', gstin: '22AAAAA0000A1Z5' },
  { id: '2', name: 'Fashion Fiesta', owner: 'Priya Patel', date: '2026-07-07', status: 'pending', gstin: '27BBBBB0000B2Z4' },
  { id: '3', name: 'Smart Home Gadgets', owner: 'Amit Kumar', date: '2026-07-05', status: 'approved', gstin: '07CCCCC0000C3Z3' }
];

export default function VendorApprovals() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vendor Approvals</h1>
          <p className="text-muted-foreground">Review and manage new seller registrations.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Business Name</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">GSTIN</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {VENDOR_APPLICATIONS.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{vendor.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.owner}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono">{vendor.gstin}</td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={vendor.status as any} />
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    {vendor.status === 'pending' && (
                      <>
                        <button className="p-2 text-slate-400 hover:text-green-600 bg-slate-100 hover:bg-green-50 dark:bg-slate-800 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
