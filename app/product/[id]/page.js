"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Truck, Shield, ArrowRight, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/features/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductPage({ params }) {
    // Unwrap params 
    const { id } = use(params);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");

    useEffect(() => {
        async function fetchProductData() {
            setLoading(true);
            try {
                // Fetch product details
                const res = await fetch(`/api/products/${id}`);

                if (!res.ok) {
                    if (res.status === 404) {
                        setProduct(null); // Will trigger notFound() check
                    }
                    setLoading(false);
                    return;
                }

                const productData = await res.json();
                setProduct(productData);

                // Fetch related products (could be optimized to be server-side or separate endpoint, 
                // but for now we'll fetch all and filter client-side or use a new logic. 
                // Let's just fetch all products for 'related' to keep it simple as per plan, 
                // or ideally the API should support 'related'. 
                // Let's fetch all products and filter manually to match previous logic.)
                const allRes = await fetch('/api/products');
                const allProducts = await allRes.json();

                const related = allProducts
                    .filter((p) => p.categories.some(c => productData.categories.includes(c)) && p.id !== productData.id)
                    .slice(0, 4);

                setRelatedProducts(related);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        }

        fetchProductData();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!product) {
        notFound();
    }

    const handleQuantityChange = (type) => {
        if (type === "minus" && quantity > 1) setQuantity(quantity - 1);
        if (type === "plus" && quantity < 10) setQuantity(quantity + 1);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Product Detail Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden border border-border">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded">
                                    NEW
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current opacity-50" />
                            </div>
                            <span className="text-muted text-sm">(120 Reviews)</span>
                        </div>

                        <div className="flex items-baseline space-x-4 mb-6">
                            <span className="text-3xl font-bold text-primary">
                                PKR {product.salePrice || product.price}
                            </span>
                            {product.salePrice && (
                                <span className="text-xl text-muted line-through">
                                    PKR {product.price}
                                </span>
                            )}
                        </div>

                        <p className="text-muted mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-6 mb-8">
                            {/* Color Selection (Mock) */}
                            <div>
                                <h3 className="font-semibold mb-3">Color</h3>
                                <div className="flex space-x-3">
                                    {['bg-black', 'bg-blue-900', 'bg-gray-500'].map((color, i) => (
                                        <button
                                            key={i}
                                            className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ${i === 0 ? 'ring-accent' : 'ring-transparent'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection (Mock) */}
                            <div>
                                <h3 className="font-semibold mb-3">Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[3rem] h-10 px-3 rounded-md border flex items-center justify-center transition-colors ${selectedSize === size
                                                ? 'border-accent bg-accent/5 text-accent font-medium'
                                                : 'border-border hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-8">
                            <div className="flex items-center border border-border rounded-md">
                                <button
                                    onClick={() => handleQuantityChange('minus')}
                                    className="p-3 hover:text-accent transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange('plus')}
                                    className="p-3 hover:text-accent transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <Button
                                size="lg"
                                className="flex-1 text-lg"
                                onClick={() => addToCart(product, quantity, selectedSize, "black")} // Default color for simplicity if not selected
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className={`text-lg ${isInWishlist(product.id) ? 'border-red-500 text-red-500 hover:bg-red-50' : ''}`}
                                onClick={() => toggleWishlist(product)}
                                title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted">
                            <div className="flex items-center space-x-2">
                                <Truck className="w-4 h-4" />
                                <span>Free shipping over PKR 5,000</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4" />
                                <span>2 year warranty</span>
                            </div>
                        </div>

                        {/* Delivery Estimate */}
                        <div className="bg-secondary/10 p-4 rounded-md border border-border">
                            <p className="text-sm font-semibold mb-1">Estimated Delivery</p>
                            <p className="text-sm text-muted">
                                Order now to receive between <span className="text-foreground font-medium">
                                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span> and <span className="text-foreground font-medium">
                                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="border-t border-border pt-16">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-2xl font-bold">You might also like</h2>
                            <Link href="/shop" className="text-accent hover:underline flex items-center">
                                View all <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
