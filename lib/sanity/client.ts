import { Category, Product } from '@/lib/types/product';
import { sanityClient } from '../../cms/sanity.config';

// Helper to build the images array from Sanity assets or external URL
const imageProjection = `
    "images": select(
        defined(images) && count(images) > 0 => images[].asset->url,
        defined(externalImageUrl) => [externalImageUrl],
        []
    )
`;

// Category projection for dereferencing
const categoryProjection = `
    "category": category-> {
        "id": _id,
        "name": {
            "en": name.en,
            "ar": name.ar
        },
        "slug": slug.current,
        "description": {
            "en": description.en,
            "ar": description.ar
        },
        "image": image.asset->url,
        "order": order
    }
`;

// Common product fields projection
const productFields = `
    "id": _id,
    "name": {
        "en": name.en,
        "ar": name.ar
    },
    "slug": slug.current,
    "description": {
        "en": description.en,
        "ar": description.ar
    },
    price,
    ${imageProjection},
    ${categoryProjection},
    rating,
    featured,
    inStock,
    roastLevel,
    origin,
    "createdAt": _createdAt
`;

/**
 * Fetch all products from Sanity
 */
export async function getProducts(): Promise<Product[]> {
    const query = `*[_type == "product"] | order(_createdAt desc) {
        ${productFields}
    }`;

    try {
        const products = await sanityClient.fetch(query);
        return products || [];
    } catch (error) {
        console.error('Failed to fetch products from Sanity:', error);
        return [];
    }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const query = `*[_type == "product" && slug.current == $slug][0] {
        ${productFields}
    }`;

    try {
        return await sanityClient.fetch(query, { slug });
    } catch (error) {
        console.error('Failed to fetch product from Sanity:', error);
        return null;
    }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    const query = `*[_type == "product" && _id == $id][0] {
        ${productFields}
    }`;

    try {
        return await sanityClient.fetch(query, { id });
    } catch (error) {
        console.error('Failed to fetch product from Sanity:', error);
        return null;
    }
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
    const query = `*[_type == "product" && featured == true] | order(_createdAt desc) {
        ${productFields}
    }`;

    try {
        const products = await sanityClient.fetch(query);
        return products || [];
    } catch (error) {
        console.error('Failed to fetch featured products from Sanity:', error);
        return [];
    }
}

/**
 * Fetch all categories from Sanity
 */
export async function getCategories(): Promise<Category[]> {
    const query = `*[_type == "category"] | order(order asc) {
        "id": _id,
        "name": {
            "en": name.en,
            "ar": name.ar
        },
        "slug": slug.current,
        "description": {
            "en": description.en,
            "ar": description.ar
        },
        "image": image.asset->url,
        "order": order
    }`;

    try {
        const categories = await sanityClient.fetch(query);
        return categories || [];
    } catch (error) {
        console.error('Failed to fetch categories from Sanity:', error);
        return [];
    }
}
