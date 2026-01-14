"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function HomeSidebar() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-border pr-8 py-8 mr-8">
            <h3 className="text-lg font-bold mb-6 px-4">Categories</h3>
            <nav className="space-y-2">
                {loading ? (
                    // Loading skeletons
                    [1, 2, 3].map(i => <div key={i} className="h-10 bg-secondary/30 rounded-md animate-pulse mx-4"></div>)
                ) : (
                    <>
                        <Link
                            href="/shop"
                            className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-secondary transition-colors font-medium"
                        >
                            <span>All Products</span>
                            <ChevronRight className="w-4 h-4 text-muted" />
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.value}
                                href={`/shop?category=${cat.value}`}
                                className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-secondary transition-colors text-muted hover:text-foreground"
                            >
                                <span>{cat.name}</span>
                                <ChevronRight className="w-4 h-4 text-muted" />
                            </Link>
                        ))}
                    </>
                )}
            </nav>

            {/* Promo Box in Sidebar */}
            <div className="mt-12 mx-4 p-6 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="font-bold text-accent mb-2">Summer Sale</h4>
                <p className="text-sm text-muted mb-4">Get up to 50% off on selected items.</p>
                <Link href="/shop" className="text-sm font-semibold text-accent hover:underline">
                    View Offers &rarr;
                </Link>
            </div>
        </aside>
    );
}
