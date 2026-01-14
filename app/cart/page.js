"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const shipping = cartTotal > 5000 ? 0 : 500;
    const total = cartTotal + shipping;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-6">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <motion.div
                                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-secondary/30 p-4 rounded-lg border border-border"
                                >
                                    <div className="relative w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.id}`} className="font-semibold text-lg hover:text-accent transition-colors truncate block">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-muted">
                                            Size: {item.selectedSize} • Color: {item.selectedColor}
                                        </p>
                                        <div className="block sm:hidden mt-2 font-bold">
                                            PKR {item.salePrice || item.price}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex items-center border border-border rounded-md bg-background">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                                className="p-2 hover:text-accent transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                                className="p-2 hover:text-accent transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="hidden sm:block font-bold min-w-[3rem] text-right">
                                            PKR {(item.salePrice || item.price) * item.quantity}
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                            className="text-muted hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 border border-dashed border-border rounded-lg">
                                <p className="text-muted mb-6">Your cart is empty.</p>
                                <Link href="/shop">
                                    <Button variant="outline">Start Shopping</Button>
                                </Link>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-6">
                            <Link href="/shop" className="text-muted hover:text-accent transition-colors flex items-center">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-secondary/30 p-6 rounded-lg border border-border sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-border">
                                <div className="flex justify-between">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="font-medium">PKR {cartTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? "Free" : `PKR ${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Tax Estimate</span>
                                    <span className="font-medium">PKR 0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-accent">PKR {total}</span>
                            </div>

                            <Link href="/checkout" className={`block ${cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                                <Button size="lg" className="w-full text-lg" disabled={cartItems.length === 0}>
                                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
