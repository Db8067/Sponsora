import React from 'react';
import { Package, FolderTree, IndianRupee, TrendingUp, Plus } from 'lucide-react';
import { ProductCard, Product } from '@/components/ProductCard';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'Wireless Earbuds Pro',
    description: 'High quality sound.',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    vendorName: 'My Store',
    rating: 0,
    reviews: 0,
    status: 'pending'
  },
  {
    id: '102',
    name: 'Smart Watch Adapter',
    description: 'Fast charging adapter.',
    price: 999,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    vendorName: 'My Store',
    rating: 4.5,
    reviews: 12,
    status: 'approved'
  }
];

export default function VendorDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r hidden md:block">
        <div className="p-6">
          <h2 className="font-bold text-lg mb-6 text-slate-800 dark:text-slate-100">My Store</h2>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium">
              <TrendingUp className="w-5 h-5" /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
              <Package className="w-5 h-5" /> Products
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
              <FolderTree className="w-5 h-5" /> Collections
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
              <IndianRupee className="w-5 h-5" /> Orders
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Collection
            </button>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Sales</h3>
            <p className="text-3xl font-bold">₹12,450</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Products</h3>
            <p className="text-3xl font-bold">1</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Orders</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>

        {/* Products List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Products</h2>
            <a href="#" className="text-sm text-primary hover:underline font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} showStatus={true} />
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
            <div className="mt-0.5">ℹ️</div>
            <p className="text-sm">
              <strong>Note:</strong> Newly added products and collections are marked as <span className="font-semibold">Pending Review</span>. 
              They will appear on the main marketplace once approved by our admin team (usually within 2-4 hours).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
