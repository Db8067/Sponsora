import React from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';

// Mock data
const CONTENT_SUBMISSIONS = [
  { id: '1', type: 'Product', name: 'Wireless Earbuds Pro', vendor: 'My Store', date: '2026-07-08', status: 'pending', price: '₹2,999' },
  { id: '2', type: 'Collection', name: 'Summer Electronics', vendor: 'TechHaven India', date: '2026-07-08', status: 'pending', items: '12 items' },
  { id: '3', type: 'Product', name: 'Smart Watch Adapter', vendor: 'My Store', date: '2026-07-07', status: 'approved', price: '₹999' }
];

export default function ContentReview() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Review</h1>
          <p className="text-muted-foreground">Approve or reject products and collections before they go live on the marketplace.</p>
        </div>
      </div>
      
      <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-white/20 dark:border-white/10 bg-white/5 dark:bg-slate-800/20">
          <select className="bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none">
            <option>All Types</option>
            <option>Products</option>
            <option>Collections</option>
          </select>
          <select className="bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none">
            <option>Pending Only</option>
            <option>All Statuses</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 border-b border-white/20 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Vendor</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {CONTENT_SUBMISSIONS.map((item) => (
                <tr key={item.id} className="hover:bg-white/10 dark:hover:bg-slate-800/30 transition-colors border-b border-white/10 dark:border-white/5 last:border-0">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.type === 'Product' 
                        ? 'bg-pink-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.vendor}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.price || item.items}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status as any} />
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="p-2 text-slate-700 hover:text-pink-600 bg-white/20 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-blue-900/50 rounded-lg transition-colors" title="Preview">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {item.status === 'pending' && (
                      <>
                        <button className="p-2 text-slate-700 hover:text-green-600 bg-white/20 hover:bg-green-100 dark:bg-white/10 dark:hover:bg-green-900/50 rounded-lg transition-colors" title="Approve & Publish">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-700 hover:text-red-600 bg-white/20 hover:bg-red-100 dark:bg-white/10 dark:hover:bg-red-900/50 rounded-lg transition-colors" title="Reject">
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
