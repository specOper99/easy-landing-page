import { getProducts } from '@/lib/sanity/client';
import { ApiResponse, Product } from '@/lib/types/product';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/products
 * List all products from Sanity with optional filtering
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        // Fetch products from Sanity
        let products = await getProducts();

        // Filter by category slug
        if (category && category !== 'all') {
            products = products.filter(
                (p) => p.category?.slug === category
            );
        }

        // Filter by search query (name or description)
        if (search) {
            const query = search.toLowerCase();
            products = products.filter(
                (p) =>
                    p.name.en.toLowerCase().includes(query) ||
                    p.name.ar.toLowerCase().includes(query) ||
                    p.description.en.toLowerCase().includes(query) ||
                    p.description.ar.toLowerCase().includes(query)
            );
        }

        // Filter by featured
        if (featured === 'true') {
            products = products.filter((p) => p.featured);
        }

        // Filter by price range
        if (minPrice) {
            products = products.filter(
                (p) => p.price >= parseFloat(minPrice)
            );
        }
        if (maxPrice) {
            products = products.filter(
                (p) => p.price <= parseFloat(maxPrice)
            );
        }

        const response: ApiResponse<Product[]> = {
            success: true,
            data: products,
            message: `Found ${products.length} products`,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        const response: ApiResponse<null> = {
            success: false,
            error: 'Failed to fetch products',
        };
        return NextResponse.json(response, { status: 500 });
    }
}

/**
 * POST /api/products
 * Create a new product - Not supported via API, use Sanity Studio
 */
export async function POST(request: NextRequest) {
    const response: ApiResponse<null> = {
        success: false,
        error: 'Product creation is managed through Sanity CMS. Please use the CMS at /manage-content',
    };
    return NextResponse.json(response, { status: 405 });
}
