import { NextResponse } from 'next/server';
import { products } from '@/constants/products';
import { mapExternalProduct } from '@/services/productService';

export async function GET(request, context) {
    const { id } = await context.params;

    if (id.startsWith('external-')) {
        const externalId = id.replace('external-', '');
        try {
            const response = await fetch(`https://dummyjson.com/products/${externalId}`);
            if (!response.ok) throw new Error('Product not found');
            const p = await response.json();

            return NextResponse.json(mapExternalProduct(p));
        } catch (error) {
            return NextResponse.json({ error: 'External product not found' }, { status: 404 });
        }
    }

    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}
