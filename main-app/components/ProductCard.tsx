import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  vendorName: string;
  rating: number;
  reviews: number;
  status: 'approved' | 'pending' | 'rejected';
}

interface ProductCardProps {
  product: Product;
  showStatus?: boolean;
}

export function ProductCard({ product, showStatus = false }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {showStatus && (
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={product.status} />
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mt-1 mb-4 line-clamp-1">
          By {product.vendorName}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
          <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
