import { getCategories } from '@/lib/sanity/client';
import { ApiResponse, Category } from '@/lib/types/product';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/categories
 * List all categories from Sanity
 */
export async function GET(request: NextRequest) {
    try {
        const categories = await getCategories();

        const response: ApiResponse<Category[]> = {
            success: true,
            data: categories,
            message: `Found ${categories.length} categories`,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        const response: ApiResponse<null> = {
            success: false,
            error: 'Failed to fetch categories',
        };
        return NextResponse.json(response, { status: 500 });
    }
}
