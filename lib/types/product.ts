export interface Category {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    slug: string;
    description?: {
        en: string;
        ar: string;
    };
    image?: string;
    order?: number;
}

export interface Product {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    slug: string;
    description: {
        en: string;
        ar: string;
    };
    price: number;
    images: string[];
    category: Category;
    rating: number;
    featured: boolean;
    inStock: boolean;
    roastLevel?: 'light' | 'medium' | 'dark';
    origin?: string;
    createdAt: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface NewsletterFormData {
    email: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface ProductFilters {
    category?: Category | 'all';
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
}
