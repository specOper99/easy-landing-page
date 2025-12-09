import { MagicSparkles } from '@/components/effects/MagicSparkles';
import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { FlyingCarpet } from '@/components/patterns/FlyingCarpet';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { getFeaturedProducts } from '@/lib/sanity/client';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Fetch translations for server component
  const t = await getTranslations('hero');
  const tAbout = await getTranslations('about');
  const tProducts = await getTranslations('products');
  
  // Fetch featured products from Sanity CMS
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden carpet-texture">
        {/* Magic Sparkles */}
        <MagicSparkles count={30} />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="geometric" className="w-full h-full" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center py-20">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Decorative Top Pattern */}
            <div className="flex justify-center mb-8">
              <CarpetPattern variant="medallion" size={120} className="opacity-60" />
            </div>

            <h1 className="text-5xl md:text-7xl font-amiri font-bold leading-tight">
              {t('title')}
            </h1>

            <p className="text-2xl md:text-3xl text-secondary font-semibold">
              {t('subtitle')}
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('tagline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href={`/${locale}/products`}>
                <Button size="lg" variant="primary" className="group">
                  {t('cta')}
                  <ArrowRight className={`w-5 h-5 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} transition-transform group-hover:translate-x-1`} />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button size="lg" variant="outline">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-24 text-background">
            <path
              fill="currentColor"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-amiri font-bold mb-4">
              {tProducts('featured')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {tProducts('subtitle')}
            </p>
          </div>

          <Divider variant="ornate" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} locale={locale} />
              </div>
            ))}
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

      {/* Brand Story Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="diamond" className="w-full h-full" />
        </div>
        <MagicSparkles count={15} />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-amiri font-bold">
              {tAbout('story')}
            </h2>
            
            {/* Flying Carpet with Story */}
            <FlyingCarpet variant="large" className="mx-auto group animate-wave">
              <p className="text-lg leading-relaxed">
                {tAbout('storyText')}
              </p>
            </FlyingCarpet>

            <Divider variant="ornate" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {['quality', 'tradition', 'craftsmanship'].map((value) => (
                <div key={value} className="text-center p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <h3 className="text-2xl font-amiri font-bold text-secondary mb-3">
                    {tAbout(value)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tAbout(`${value}Text`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link href={`/${locale}/about`}>
                <Button size="lg" variant="accent">
                  {tAbout('mission')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
