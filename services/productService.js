export const mapExternalProduct = (p) => {
    // Map DummyJSON categories to local categories
    let categories = [];
    const cat = p.category.toLowerCase();

    if (cat.includes('womens') || ['beauty', 'fragrances', 'skin-care'].includes(cat)) {
        categories.push('women');
    } else if (cat.includes('mens') || cat === 'tops') {
        categories.push('men');
    } else if (['smartphones', 'laptops', 'fragrances', 'mobile-accessories', 'tablets', 'sunglasses', 'watches'].includes(cat)) {
        categories.push('accessories');
    } else {
        categories.push('accessories'); // Default for others
    }

    // Sub-category mapping
    let subCategory = cat.replace('womens-', '').replace('mens-', '');

    return {
        id: `external-${p.id}`,
        name: p.title,
        price: Math.round(p.price * 280), // Convert to PKR-like pricing
        salePrice: p.discountPercentage > 0 ? Math.round((p.price * (1 - p.discountPercentage / 100)) * 280) : null,
        image: p.thumbnail,
        images: p.images,
        categories: categories,
        subCategory: subCategory,
        colors: ["black", "white", "gray"],
        sizes: ["M", "L", "XL"],
        isNew: p.rating > 4.5,
        description: p.description,
        rating: p.rating,
        stock: p.stock,
        brand: p.brand
    };
};

export async function fetchExternalProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        return data.products.map(mapExternalProduct);
    } catch (error) {
        console.error('Error fetching external products:', error);
        throw error;
    }
}
