import { Divider } from '@/components/patterns/Divider';
import { LazyProductGrid } from '@/components/products/LazyProductGrid';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { Button } from '@/components/ui/Button';
import { getFeaturedProducts } from '@/lib/sanity/client';
import { Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface FeaturedProductsSectionProps {
  locale: string;
}

// Skeleton for the entire section
export function FeaturedProductsSkeleton() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 w-72 mx-auto bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 w-96 max-w-full mx-auto bg-muted rounded animate-pulse" />
        </div>

        {/* Divider skeleton */}
        <div className="h-4 w-full bg-muted/30 rounded" />

        {/* Products skeleton */}
        <div className="mt-12">
          <ProductGridSkeleton count={3} />
        </div>

        {/* Button skeleton */}
        <div className="text-center mt-12">
          <div className="h-12 w-40 mx-auto bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Async component that fetches and renders featured products
export async function FeaturedProductsSection({ locale }: FeaturedProductsSectionProps) {
  const tProducts = await getTranslations('products');
  
  // Fetch featured products from Sanity CMS
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        {/* Light elegant header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold mb-4">
            {tProducts('featured')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {tProducts('subtitle')}
          </p>
        </div>

        <Divider variant="simple" />

        <div className="mt-12">
          <LazyProductGrid products={featuredProducts} locale={locale} />
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/products`}>
            <Button size="lg" variant="secondary">
              {tProducts('allProducts')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
