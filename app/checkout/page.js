"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CreditCard, Lock, ArrowLeft, Banknote, Smartphone, Building } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Payment Method State
    const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod', 'card', 'easypaisa', 'bank'

    const shipping = cartTotal > 5000 ? 0 : 500;
    const total = cartTotal + shipping;

    // Redirect to cart if empty
    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            router.push('/cart');
        }
    }, [cartItems, isSuccess, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart and show success
        clearCart();
        setIsProcessing(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-md w-full bg-secondary/30 p-8 rounded-2xl border border-border"
                >
                    <div className="mx-auto w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-muted mb-8">
                        Thank you for your purchase. We have sent a confirmation email to your inbox.
                    </p>
                    <Link href="/">
                        <Button size="lg" className="w-full">Return Home</Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) return null;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Link href="/cart" className="text-muted hover:text-accent transition-colors flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="md:col-span-2 space-y-8">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Information */}
                            <section className="bg-secondary/20 p-6 rounded-lg border border-border">
                                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="newsletter" className="rounded border-gray-300" />
                                        <label htmlFor="newsletter" className="text-sm text-muted">Email me with news and offers</label>
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Information */}
                            <section className="bg-secondary/20 p-6 rounded-lg border border-border">
                                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                                        <input type="text" id="firstName" required className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                                        <input type="text" id="lastName" required className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                                        <input type="text" id="address" required className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                                        <input type="text" id="city" required className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                                        <input type="text" id="postalCode" required className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method Selector */}
                            <section className="bg-secondary/20 p-6 rounded-lg border border-border">
                                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("cod")}
                                        className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "cod" ? "border-accent bg-accent/10 text-accent font-bold" : "border-border hover:border-gray-400"
                                            }`}
                                    >
                                        <Banknote className="w-6 h-6" />
                                        <span className="text-xs text-center">Cash on Delivery</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("card")}
                                        className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "card" ? "border-accent bg-accent/10 text-accent font-bold" : "border-border hover:border-gray-400"
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6" />
                                        <span className="text-xs text-center">Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("easypaisa")}
                                        className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "easypaisa" ? "border-accent bg-accent/10 text-accent font-bold" : "border-border hover:border-gray-400"
                                            }`}
                                    >
                                        <Smartphone className="w-6 h-6" />
                                        <span className="text-xs text-center">EasyPaisa / JazzCash</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("bank")}
                                        className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "bank" ? "border-accent bg-accent/10 text-accent font-bold" : "border-border hover:border-gray-400"
                                            }`}
                                    >
                                        <Building className="w-6 h-6" />
                                        <span className="text-xs text-center">Bank Transfer</span>
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {paymentMethod === "cod" && (
                                        <motion.div
                                            key="cod"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-background p-4 rounded-md border border-border text-center"
                                        >
                                            <p className="text-muted">
                                                You will pay in cash upon delivery. Please ensure you have the exact amount ready.
                                            </p>
                                        </motion.div>
                                    )}

                                    {paymentMethod === "card" && (
                                        <motion.div
                                            key="card"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-4"
                                        >
                                            <div className="relative">
                                                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="cardNumber"
                                                        placeholder="0000 0000 0000 0000"
                                                        required={paymentMethod === "card"}
                                                        className="w-full bg-background border border-border rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                                    />
                                                    <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                                                    <input type="text" id="expiry" placeholder="MM/YY" required={paymentMethod === "card"} className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                                </div>
                                                <div>
                                                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                                                    <input type="text" id="cvc" placeholder="123" required={paymentMethod === "card"} className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                                </div>
                                            </div>
                                            <div className="flex items-center text-sm text-green-500">
                                                <Lock className="w-4 h-4 mr-2" />
                                                <span>Secure SSL Encrypted Transaction</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {paymentMethod === "easypaisa" && (
                                        <motion.div
                                            key="easypaisa"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-4"
                                        >
                                            <div className="bg-background p-4 rounded-md border border-border mb-4">
                                                <h4 className="font-semibold mb-2">Instructions:</h4>
                                                <ul className="text-sm text-muted list-disc ml-4 space-y-1">
                                                    <li>Send amount to EasyPaisa/JazzCash: <span className="text-foreground font-bold">0300-1234567</span></li>
                                                    <li>Account Title: <span className="text-foreground font-bold">Luxe Store</span></li>
                                                    <li>Enter the Transaction ID below after payment.</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <label htmlFor="trxId" className="block text-sm font-medium mb-1">Transaction ID (TID)</label>
                                                <input type="text" id="trxId" placeholder="e.g. 8374928374" required={paymentMethod === "easypaisa"} className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {paymentMethod === "bank" && (
                                        <motion.div
                                            key="bank"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-4"
                                        >
                                            <div className="bg-background p-4 rounded-md border border-border mb-4">
                                                <h4 className="font-semibold mb-2">Bank Details:</h4>
                                                <div className="text-sm text-muted space-y-1">
                                                    <p>Bank Name: <span className="text-foreground font-bold">HBL</span></p>
                                                    <p>Account Title: <span className="text-foreground font-bold">Luxe Store Pvt Ltd</span></p>
                                                    <p>Account Number: <span className="text-foreground font-bold">1234 5678 9012 3456</span></p>
                                                    <p>IBAN: <span className="text-foreground font-bold">PK36 HABB 0012 3456 7890 1234</span></p>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="bankRef" className="block text-sm font-medium mb-1">Payment Reference / Transaction ID</label>
                                                <input type="text" id="bankRef" required={paymentMethod === "bank"} className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 bg-background border border-border p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                            <div className="space-y-4 mb-6 border-b border-border pb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Subtotal</span>
                                    <span>PKR {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Taxes</span>
                                    <span>PKR 0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg mb-8">
                                <span>Total</span>
                                <span>PKR {total.toLocaleString()}</span>
                            </div>
                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : `Place Order (${paymentMethod.toUpperCase()})`}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
