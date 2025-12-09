export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ar', title: 'Arabic', type: 'string' },
            ],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name.en', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'ar', title: 'Arabic', type: 'text' },
            ],
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'images',
            title: 'Images (Sanity Assets)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Upload images to Sanity CDN',
        },
        {
            name: 'externalImageUrl',
            title: 'External Image URL',
            type: 'string',
            description: 'Optional: Use an external image URL instead of uploading',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule: any) => Rule.min(0).max(5),
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'roastLevel',
            title: 'Roast Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Light', value: 'light' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Dark', value: 'dark' },
                ],
            },
        },
        {
            name: 'origin',
            title: 'Origin',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'name.en',
            subtitle: 'category.name.en',
            media: 'images.0',
        },
    },
};
