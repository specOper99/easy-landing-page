'use client';

import { Divider } from '@/components/patterns/Divider';
import { LazyProductCard } from '@/components/products/LazyProductCard';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { Category, Product } from '@/lib/types/product';
import { cn } from '@/lib/utils';
import { Filter, Loader2, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';

interface ProductsClientProps {
  products: Product[];
  categories: Category[];
  locale: string;
}

// Number of products to load per batch
const BATCH_SIZE = 6;

export default function ProductsClient({ products, categories, locale }: ProductsClientProps) {
  const t = useTranslations('products');
  // 'all' or category slug
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategorySlug === 'all' || product.category?.slug === selectedCategorySlug;

      const matchesSearch =
        searchQuery === '' ||
        product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.ar.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategorySlug, searchQuery]);

  // Products to display (paginated)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  // Check if there are more products to load
  const hasMore = displayCount < filteredProducts.length;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(BATCH_SIZE);
  }, [selectedCategorySlug, searchQuery]);

  // Load more products function
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    // Use startTransition for smoother UI updates
    startTransition(() => {
      setDisplayCount((prev) => Math.min(prev + BATCH_SIZE, filteredProducts.length));
      setIsLoadingMore(false);
    });
  }, [hasMore, isLoadingMore, filteredProducts.length]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  // Handle category change with transition
  const handleCategoryChange = (slug: string) => {
    startTransition(() => {
      setSelectedCategorySlug(slug);
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-amiri font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Filters */}
      <section className="py-8 bg-background sticky top-20 z-40 border-b border-border/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${locale === 'ar' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full py-3 px-10 rounded-lg border-2 border-border/30',
                  'bg-background text-foreground',
                  'focus:outline-none focus:border-secondary',
                  'transition-colors'
                )}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-muted-foreground hidden md:block" />
              
              {/* All category button */}
              <button
                onClick={() => handleCategoryChange('all')}
                disabled={isPending}
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition-all',
                  selectedCategorySlug === 'all'
                    ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                    : 'bg-muted text-foreground hover:bg-muted/80',
                  isPending && 'opacity-70 cursor-wait'
                )}
              >
                {t('categories.all')}
              </button>
              
              {/* Dynamic category buttons from CMS */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  disabled={isPending}
                  className={cn(
                    'px-4 py-2 rounded-lg font-semibold transition-all',
                    selectedCategorySlug === category.slug
                      ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80',
                    isPending && 'opacity-70 cursor-wait'
                  )}
                >
                  {locale === 'ar' ? category.name.ar : category.name.en}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('loading') || 'Loading...'}
              </span>
            ) : (
              t('count', {count: filteredProducts.length})
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container-custom">
          {isPending ? (
            <ProductGridSkeleton count={BATCH_SIZE} />
          ) : displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((product, index) => (
                  <LazyProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    className="animate-slide-up"
                    animationDelay={Math.min(index * 50, 300)}
                  />
                ))}
              </div>

              {/* Load More Trigger / Loading Indicator */}
              {hasMore && (
                <div 
                  ref={loadMoreRef}
                  className="flex justify-center items-center py-12"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>{t('loading') || 'Loading more...'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"
                    >
                      {t('loadMore') || 'Load More'}
                    </button>
                  )}
                </div>
              )}

              {/* End of products indicator */}
              {!hasMore && filteredProducts.length > BATCH_SIZE && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('endOfProducts') || `Showing all ${filteredProducts.length} products`}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                {t('noResults')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
