export default {
    name: 'category',
    title: 'Category',
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
            description: 'Unique identifier for the category (e.g., "arabica", "robusta")',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Optional category image',
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which categories appear (lower = first)',
            initialValue: 0,
        },
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Name (A-Z)',
            name: 'nameAsc',
            by: [{ field: 'name.en', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name.en',
            subtitle: 'slug.current',
            media: 'image',
        },
    },
};
