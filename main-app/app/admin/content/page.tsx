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
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b bg-slate-50 dark:bg-slate-800/50">
          <select className="bg-white dark:bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none">
            <option>All Types</option>
            <option>Products</option>
            <option>Collections</option>
          </select>
          <select className="bg-white dark:bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none">
            <option>Pending Only</option>
            <option>All Statuses</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-b">
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
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.type === 'Product' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
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
                    <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Preview">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {item.status === 'pending' && (
                      <>
                        <button className="p-2 text-slate-400 hover:text-green-600 bg-slate-100 hover:bg-green-50 dark:bg-slate-800 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Approve & Publish">
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
