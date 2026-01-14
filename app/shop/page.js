"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/features/product/ProductCard";
import { Filter, X, Search, ChevronDown, ChevronUp } from "lucide-react";
import { colors, sizes } from "@/constants/products";

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initial state from URL
    const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
    const [activeSubCategory, setActiveSubCategory] = useState(searchParams.get("subCategory") || "");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    // Filters State
    const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                if (categories.length === 0) {
                    const catRes = await fetch('/api/categories');
                    const catData = await catRes.json();
                    setCategories(catData);
                }

                // Build Query String
                const params = new URLSearchParams();
                if (activeCategory !== 'all') params.append('category', activeCategory);
                if (activeSubCategory) params.append('subCategory', activeSubCategory);
                if (debouncedSearch) params.append('search', debouncedSearch);
                if (priceRange.min > 0) params.append('minPrice', priceRange.min);
                if (priceRange.max < 200000) params.append('maxPrice', priceRange.max);
                if (selectedColor) params.append('color', selectedColor);
                if (selectedSize) params.append('size', selectedSize);

                // Update URL to match state (shallow) without full reload
                router.push(`/shop?${params.toString()}`, { scroll: false });

                const prodRes = await fetch(`/api/products?${params.toString()}`);
                const prodData = await prodRes.json();
                setProducts(prodData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch shop data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [debouncedSearch, activeCategory, activeSubCategory, priceRange, selectedColor, selectedSize]);

    // Handlers
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setActiveSubCategory(""); // Reset sub-cat when main cat changes
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleSubCategoryChange = (sub) => {
        setActiveSubCategory(sub);
    };

    const clearFilters = () => {
        setActiveCategory("all");
        setActiveSubCategory("");
        setSearchQuery("");
        setPriceRange({ min: 0, max: 200000 });
        setSelectedColor("");
        setSelectedSize("");
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background">
            <div className="container mx-auto px-4">
                {/* Header with Search */}
                <div className="mb-10 text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight"
                    >
                        Shop Collection
                    </motion.h1>

                    <div className="max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                    </div>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-6 flex justify-between items-center">
                    <span className="font-medium text-muted">{products.length} Results</span>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-md font-medium"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`fixed inset-0 z-50 bg-background md:static md:z-0 md:bg-transparent md:w-1/4 p-6 md:p-0 overflow-y-auto md:overflow-visible transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                        <div className="md:sticky md:top-24 bg-background md:border md:border-border md:rounded-lg md:p-6 md:shadow-sm h-full md:h-auto">
                            {/* Mobile Close */}
                            <div className="flex justify-between items-center mb-6 md:hidden">
                                <h3 className="font-bold text-lg">Filters</h3>
                                <button onClick={() => setIsFilterOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Clear All */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg hidden md:block">Filters</h3>
                                <button onClick={clearFilters} className="text-xs text-accent hover:underline">
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Categories */}
                                <div>
                                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Category</h3>
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => handleCategoryChange("all")}
                                            className={`block w-full text-left px-2 py-1.5 rounded transition-colors text-sm ${activeCategory === "all" ? "bg-accent/10 text-accent font-bold" : "hover:bg-secondary"
                                                }`}
                                        >
                                            All Products
                                        </button>
                                        {categories.map((cat) => (
                                            <div key={cat.value}>
                                                <button
                                                    onClick={() => handleCategoryChange(cat.value)}
                                                    className={`flex justify-between items-center w-full text-left px-2 py-1.5 rounded transition-colors text-sm ${activeCategory === cat.value ? "bg-accent/10 text-accent font-bold" : "hover:bg-secondary"
                                                        }`}
                                                >
                                                    <span>{cat.name}</span>
                                                    {(activeCategory === cat.value || expandedCategory === cat.value) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                </button>

                                                {/* Sub-categories */}
                                                {cat.subCategories && (activeCategory === cat.value || expandedCategory === cat.value) && (
                                                    <div className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                                                        {cat.subCategories.map(sub => (
                                                            <button
                                                                key={sub}
                                                                onClick={() => handleSubCategoryChange(sub)}
                                                                className={`block w-full text-left px-2 py-1 rounded transition-colors text-xs ${activeSubCategory === sub ? "text-accent font-semibold" : "text-muted hover:text-foreground"
                                                                    }`}
                                                            >
                                                                {sub}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Price Range</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs text-muted">
                                            <span>PKR {priceRange.min}</span>
                                            <span>PKR {priceRange.max}+</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200000"
                                            step="5000"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                            className="w-full accent-accent"
                                        />
                                        <div className="text-center font-medium text-sm">
                                            Up to PKR {priceRange.max.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div>
                                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Color</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((c) => (
                                            <button
                                                key={c.value}
                                                onClick={() => setSelectedColor(selectedColor === c.value ? "" : c.value)}
                                                title={c.name}
                                                className={`w-6 h-6 rounded-full border border-gray-200 shadow-sm transition-transform ${c.class} ${selectedColor === c.value ? 'ring-2 ring-offset-2 ring-accent scale-110' : ''
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div>
                                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Size</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSize(selectedSize === s ? "" : s)}
                                                className={`text-xs px-2 py-1 border rounded transition-colors ${selectedSize === s ? "bg-accent text-accent-foreground border-accent" : "hover:border-gray-400"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="hidden md:flex mb-6 justify-between items-center">
                            <span className="text-muted">Showing {products.length} results</span>
                            <select className="bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:border-accent">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-96 bg-secondary/30 animate-shimmer rounded-lg"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-secondary/20 rounded-lg border border-dashed border-border">
                                <p className="text-lg text-muted mb-2">No products found.</p>
                                <p className="text-sm text-muted mb-4">Try adjusting your filters or search query.</p>
                                <button
                                    onClick={clearFilters}
                                    className="text-accent hover:underline font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
