/**
 * Script to migrate static product data to Sanity CMS
 * Run with: npx ts-node --skip-project scripts/seed-products.ts
 */

import { createClient } from '@sanity/client';
import productsData from '../lib/data/products.json';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-03-15',
});

interface StaticProduct {
    id: string;
    name: { en: string; ar: string };
    slug: string;
    description: { en: string; ar: string };
    price: number;
    images: string[];
    category: string;
    rating: number;
    featured: boolean;
    inStock: boolean;
    roastLevel?: string;
    origin?: string;
    createdAt: string;
}

// Default categories to seed
const defaultCategories = [
    { slug: 'arabica', name: { en: 'Arabica', ar: 'أرابيكا' }, order: 1 },
    { slug: 'robusta', name: { en: 'Robusta', ar: 'روبوستا' }, order: 2 },
    { slug: 'blend', name: { en: 'Blend', ar: 'مزيج' }, order: 3 },
    { slug: 'specialty', name: { en: 'Specialty', ar: 'مميز' }, order: 4 },
];

async function seedCategories(): Promise<Map<string, string>> {
    console.log('Seeding categories...');
    const categoryIdMap = new Map<string, string>();

    for (const category of defaultCategories) {
        const sanityCategory = {
            _type: 'category',
            _id: `category-${category.slug}`,
            name: category.name,
            slug: {
                _type: 'slug',
                current: category.slug,
            },
            order: category.order,
        };

        try {
            const result = await client.createOrReplace(sanityCategory);
            categoryIdMap.set(category.slug, result._id);
            console.log(`✓ Created/Updated category: ${category.name.en} (${result._id})`);
        } catch (error) {
            console.error(`✗ Failed to create category ${category.name.en}:`, error);
        }
    }

    return categoryIdMap;
}

async function seedProducts(categoryIdMap: Map<string, string>) {
    console.log('\nSeeding products...');

    const products = productsData as StaticProduct[];

    for (const product of products) {
        // Get the category reference ID
        const categoryId = categoryIdMap.get(product.category);
        if (!categoryId) {
            console.warn(`⚠ Category "${product.category}" not found for product "${product.name.en}". Skipping...`);
            continue;
        }

        const sanityProduct = {
            _type: 'product',
            _id: `product-${product.id}`,
            name: {
                en: product.name.en,
                ar: product.name.ar,
            },
            slug: {
                _type: 'slug',
                current: product.slug,
            },
            description: {
                en: product.description.en,
                ar: product.description.ar,
            },
            price: product.price,
            // Category is now a reference
            category: {
                _type: 'reference',
                _ref: categoryId,
            },
            rating: product.rating,
            featured: product.featured,
            inStock: product.inStock,
            roastLevel: product.roastLevel,
            origin: product.origin,
            // Use external image URL for the first image from static data
            externalImageUrl: product.images?.[0] || null,
        };

        try {
            const result = await client.createOrReplace(sanityProduct);
            console.log(`✓ Created/Updated: ${product.name.en} (${result._id})`);
        } catch (error) {
            console.error(`✗ Failed to create ${product.name.en}:`, error);
        }
    }
}

async function main() {
    console.log('Starting migration to Sanity...\n');

    // First seed categories and get their IDs
    const categoryIdMap = await seedCategories();

    // Then seed products with category references
    await seedProducts(categoryIdMap);

    console.log('\n✅ Migration complete!');
}

main().catch(console.error);
