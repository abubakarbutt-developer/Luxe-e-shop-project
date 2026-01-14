"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist, isLoaded: isWishlistLoaded } = useWishlist();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                    src={product.image || "https://placehold.co/400x400/png?text=Product"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                        NEW
                    </span>
                )}
                {product.salePrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                    </span>
                )}

                {/* Wishlist Heart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className={`absolute ${product.salePrice ? 'top-12 right-2' : 'top-2 right-2'} p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110 z-10`}
                    title={isWishlistLoaded && isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${isWishlistLoaded && isInWishlist(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                            }`}
                    />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
                    <Button
                        size="sm"
                        className="w-full shadow-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1, product.sizes?.[0] || 'One Size', product.colors?.[0]?.value || 'black');
                        }}
                    >
                        <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg hover:text-accent transition-colors truncate">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center mt-1 space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-muted">4.8 (120)</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary">PKR {product.salePrice || product.price}</span>
                        {product.salePrice && (
                            <span className="text-sm text-muted line-through">PKR {product.price}</span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
