'use client';

import { Product } from '@/lib/types/product';
import { LazyProductCard } from './LazyProductCard';
import { ProductGridSkeleton } from './ProductCardSkeleton';

interface LazyProductGridProps {
  products: Product[];
  locale: string;
  showSkeleton?: boolean;
  skeletonCount?: number;
}

export function LazyProductGrid({ 
  products, 
  locale,
  showSkeleton = false,
  skeletonCount = 3
}: LazyProductGridProps) {
  if (showSkeleton || products.length === 0) {
    return <ProductGridSkeleton count={skeletonCount} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <LazyProductCard
          key={product.id}
          product={product}
          locale={locale}
          className="animate-slide-up"
          animationDelay={index * 100}
        />
      ))}
    </div>
  );
}
