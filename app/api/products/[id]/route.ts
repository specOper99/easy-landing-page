import { getProductById } from '@/lib/sanity/client';
import { ApiResponse, Product } from '@/lib/types/product';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/products/[id]
 * Get a single product by ID from Sanity
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const product = await getProductById(id);

        if (!product) {
            const response: ApiResponse<null> = {
                success: false,
                error: 'Product not found',
            };
            return NextResponse.json(response, { status: 404 });
        }

        const response: ApiResponse<Product> = {
            success: true,
            data: product,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        const response: ApiResponse<null> = {
            success: false,
            error: 'Failed to fetch product',
        };
        return NextResponse.json(response, { status: 500 });
    }
}

/**
 * PUT /api/products/[id]
 * Update a product - Not supported via API, use Sanity Studio
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const response: ApiResponse<null> = {
        success: false,
        error: 'Product updates are managed through Sanity CMS. Please use the CMS at /manage-content',
    };
    return NextResponse.json(response, { status: 405 });
}

/**
 * DELETE /api/products/[id]
 * Delete a product - Not supported via API, use Sanity Studio
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const response: ApiResponse<null> = {
        success: false,
        error: 'Product deletion is managed through Sanity CMS. Please use the CMS at /manage-content',
    };
    return NextResponse.json(response, { status: 405 });
}
