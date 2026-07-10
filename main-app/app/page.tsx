import React from 'react';
import Link from 'next/link';
import { Search, Menu, ShoppingCart, User, ChevronRight, LayoutGrid, Zap, ShieldCheck, Star } from 'lucide-react';
import { ProductCard, Product } from '@/components/ProductCard';
import { PromoBar } from '@/components/PromoBar';
import { HeroBanner } from '@/components/HeroBanner';
import { TypewriterSearch } from '@/components/TypewriterSearch';

// Mock data for the storefront
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium audio experience with active noise cancellation.',
    price: 14999,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    vendorName: 'AudioTech India',
    rating: 4.8,
    reviews: 1245,
    status: 'approved'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Series 7',
    description: 'Track your health and workouts with precision.',
    price: 8499,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    vendorName: 'GadgetHub',
    rating: 4.6,
    reviews: 892,
    status: 'approved'
  },
  {
    id: '3',
    name: 'Professional DSLR Camera',
    description: 'Capture stunning moments in 4K resolution.',
    price: 54999,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    vendorName: 'PhotoVision',
    rating: 4.9,
    reviews: 432,
    status: 'approved'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Maximum comfort for long working hours.',
    price: 12999,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
    vendorName: 'ErgoMates',
    rating: 4.5,
    reviews: 654,
    status: 'approved'
  }
];

const CATEGORIES = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Books', icon: '📚' }
];

export default function StorefrontHome() {
  return (
    <div className="min-h-screen bg-transparent">
      <PromoBar />
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 rounded-md hover:bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center">
              <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-8 md:h-10 w-auto dark:hidden block" />
              <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-8 md:h-10 w-auto hidden dark:block" />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl px-8">
            <TypewriterSearch />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/seller" className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <LayoutGrid className="w-4 h-4" />
              Become a Seller
            </Link>
            
            <div className="h-6 w-px bg-border hidden sm:block"></div>
            
            <Link href="/sign-in" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden sm:block">Login</span>
            </Link>
            
            <Link href="/cart" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden sm:block">Cart</span>
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden p-3 border-t bg-muted/30">
          <TypewriterSearch />
        </div>
      </header>

      {/* Main Content */}
      <HeroBanner />
      <main className="container mx-auto px-4 py-8">
        


        {/* Categories Bar */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <div key={category.name} className="flex flex-col items-center justify-center p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Value Props */}
        <section className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Free shipping on orders over ₹499</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-950/30 rounded-2xl">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">100% Secure</h3>
              <p className="text-sm text-muted-foreground">Safe payments & buyer protection</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-2xl">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-400">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Top Brands</h3>
              <p className="text-sm text-muted-foreground">Quality guaranteed directly from sellers</p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Trending Products
            </h2>
            <Link href="/products" className="text-primary font-medium hover:underline flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">Ready to start selling?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of small businesses selling their products on BazaarX and reach millions of customers.
          </p>
          <Link href="/seller">
            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Register as a Seller
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
