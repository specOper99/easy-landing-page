import { getCategories, getProducts } from '@/lib/sanity/client';
import ProductsClient from './ProductsClient';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  
  // Fetch products and categories from Sanity CMS
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return <ProductsClient products={products} categories={categories} locale={locale} />;
}
