"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/features/product/ProductCard";
import Button from "@/components/ui/Button";

export default function NewArrivalsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        async function fetchNewArrivals() {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const allProducts = await res.json();

                // Filter only new products
                const newProducts = allProducts.filter(p => p.isNew === true);
                setProducts(newProducts);
                setFilteredProducts(newProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchNewArrivals();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p =>
                p.categories.includes(selectedCategory.toLowerCase())
            );
        }

        // Sorting
        if (sortBy === "price-low") {
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (sortBy === "newest") {
            // Already in newest order from data
            filtered = filtered;
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, sortBy, products]);

    const categories = [
        { name: "All", value: "all" },
        { name: "Men", value: "men" },
        { name: "Women", value: "women" },
        { name: "Accessories", value: "accessories" },
        { name: "Unisex", value: "unisex" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-muted">Loading new arrivals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-b border-border">
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-6 h-6 text-accent" />
                            <span className="text-accent font-semibold uppercase tracking-wide text-sm">
                                Just Dropped
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                            New Arrivals
                        </h1>
                        <p className="text-lg text-muted max-w-2xl">
                            Discover our latest collection of premium products. Fresh styles, trending designs,
                            and exclusive items just for you.
                        </p>
                        <div className="mt-6 flex items-center space-x-4">
                            <span className="text-sm text-muted">
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Filters and Sort Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.value
                                    ? "bg-accent text-accent-foreground shadow-md"
                                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2">
                        <SlidersHorizontal className="w-4 h-4 text-muted" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-secondary border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg">
                        <Sparkles className="w-12 h-12 text-muted mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-muted mb-6">
                            Try adjusting your filters to see more products.
                        </p>
                        <Button onClick={() => setSelectedCategory("all")} variant="outline">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
