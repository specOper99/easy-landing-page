'use client';

import { Product } from '@/lib/types/product';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface LazyProductCardProps {
  product: Product;
  locale: string;
  className?: string;
  animationDelay?: number;
}

export function LazyProductCard({ 
  product, 
  locale, 
  className,
  animationDelay = 0 
}: LazyProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading when within 100px of viewport
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Add a small delay before showing the actual card for smoother transitions
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, animationDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, animationDelay]);

  return (
    <div ref={cardRef} className={className}>
      {hasLoaded ? (
        <ProductCard product={product} locale={locale} />
      ) : (
        <ProductCardSkeleton />
      )}
    </div>
  );
}
