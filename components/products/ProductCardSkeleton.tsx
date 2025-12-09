'use client';

import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div 
      className={cn(
        'group relative bg-background rounded-lg overflow-hidden',
        'border-2 border-border/30',
        'carpet-texture',
        className
      )}
    >
      {/* Product Image Skeleton */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
        
        {/* Ornate corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/30 opacity-60" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/30 opacity-60" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/30 opacity-60" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/30 opacity-60" />
      </div>

      {/* Product Info Skeleton */}
      <div className="p-6 space-y-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-muted rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 w-24 bg-muted rounded animate-pulse" />
          <div className="h-9 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton 
          key={index} 
          className="animate-slide-up"
          // Style prop not needed for animation delay as skeleton has its own
        />
      ))}
    </div>
  );
}
