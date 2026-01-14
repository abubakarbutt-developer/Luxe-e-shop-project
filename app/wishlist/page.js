"use client";

import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react"; // Import ShoppingBag here if you want to add 'Add to Cart' button
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/features/product/ProductCard";
import Button from "@/components/ui/Button";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
                    <Link href="/account">
                        <span className="text-muted hover:text-accent text-sm">Back to Account</span>
                    </Link>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product.id} className="relative group">
                                <ProductCard product={product} />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(product.id);
                                    }}
                                    className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-500/10 transition-colors z-20"
                                    title="Remove from Wishlist"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg">
                        <p className="text-muted mb-6">Your wishlist is empty.</p>
                        <Link href="/shop">
                            <Button variant="outline">Browse Products</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
