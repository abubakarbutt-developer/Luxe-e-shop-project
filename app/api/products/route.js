import { NextResponse } from 'next/server';
import { products as localProducts } from '@/constants/products';
import { fetchExternalProducts } from '@/services/productService';

let cachedProducts = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

async function getProducts() {
    const currentTime = Date.now();

    if (cachedProducts && (currentTime - lastFetchTime < CACHE_DURATION)) {
        return cachedProducts;
    }

    try {
        const externalProducts = await fetchExternalProducts();
        cachedProducts = externalProducts;
        lastFetchTime = currentTime;
        return externalProducts;
    } catch (error) {
        console.error('Failed to fetch external products:', error);
        return cachedProducts || [];
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const color = searchParams.get('color');
    const size = searchParams.get('size');

    const externalProducts = await getProducts();
    let filteredProducts = [...localProducts, ...externalProducts];

    // Category Filter
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p =>
            p.categories.includes(category.toLowerCase())
        );
    }

    // Sub-category Filter
    if (subCategory) {
        filteredProducts = filteredProducts.filter(p =>
            p.subCategory === subCategory.toLowerCase() || p.categories.includes(subCategory.toLowerCase())
        );
    }

    // Search Filter
    if (search) {
        const q = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }

    // Price Range Filter
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => (p.salePrice || p.price) >= parseInt(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => (p.salePrice || p.price) <= parseInt(maxPrice));
    }

    // Color Filter
    if (color) {
        filteredProducts = filteredProducts.filter(p =>
            p.colors && p.colors.includes(color.toLowerCase())
        );
    }

    // Size Filter
    if (size) {
        filteredProducts = filteredProducts.filter(p =>
            p.sizes && p.sizes.includes(size)
        );
    }

    return NextResponse.json(filteredProducts);
}
