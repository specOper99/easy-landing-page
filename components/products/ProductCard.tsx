import { Product } from '@/lib/types/product';
import { cn, formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  locale: string;
  className?: string;
}

export function ProductCard({ product, locale, className }: ProductCardProps) {
  const t = useTranslations('products');
  const name = locale === 'ar' ? product.name.ar : product.name.en;
  const description = locale === 'ar' ? product.description.ar : product.description.en;
  
  // Get the first image URL (from Sanity or static path)
  const imageUrl = product.images?.[0] || null;
  const hasImage = imageUrl && imageUrl.length > 0;

  return (
    <div 
      className={cn(
        'group relative bg-background rounded-lg overflow-hidden',
        'border-2 border-border/30 hover:border-border',
        'transition-all duration-300 hover:shadow-2xl hover:-translate-y-2',
        'carpet-texture hover:animate-glow',
        className
      )}
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
          ★ {t('featured')}
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {/* Placeholder pattern */}
            <div className="w-full h-full opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full text-border">
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M 100 40 L 100 160 M 40 100 L 160 100" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        )}
        
        {/* Ornate corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-secondary opacity-60" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-secondary opacity-60" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-secondary opacity-60" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-secondary opacity-60" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
            {locale === 'ar' ? product.category?.name?.ar : product.category?.name?.en}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-amiri font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(product.price, locale)}
          </div>
          <div className="flex gap-2">
            <Link href={`/${locale}/products/${product.id}`}>
              <Button size="sm" variant="outline">
                {t('viewDetails')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
