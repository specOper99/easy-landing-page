import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { getCategories, getProducts } from '@/lib/sanity/client';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container-custom text-center">
          <div className="h-12 md:h-16 w-64 mx-auto bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 w-96 max-w-full mx-auto bg-muted rounded animate-pulse" />
        </div>
      </section>

      {/* Divider Skeleton */}
      <div className="h-8 w-full bg-muted/30" />

      {/* Filters Skeleton */}
      <section className="py-8 bg-background border-b border-border/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="h-12 flex-1 w-full bg-muted rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-20 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="h-5 w-32 mx-auto mt-4 bg-muted rounded animate-pulse" />
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-12">
        <div className="container-custom">
          <ProductGridSkeleton count={6} />
        </div>
      </section>
    </div>
  );
}

// Async component that fetches data
async function ProductsContent({ locale }: { locale: string }) {
  // Fetch products and categories from Sanity CMS
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return <ProductsClient products={products} categories={categories} locale={locale} />;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent locale={locale} />
    </Suspense>
  );
}
