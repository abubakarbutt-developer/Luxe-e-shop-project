"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { LogOut } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

import { useScroll } from "@/hooks/useScroll";

export default function Navbar() {
    const { cartCount, isLoaded: isCartLoaded } = useCart();
    const { user, logout, loading: isAuthLoading } = useAuth();
    const { wishlist, isLoaded: isWishlistLoaded } = useWishlist();
    const [isOpen, setIsOpen] = useState(false);
    const isScrolled = useScroll(20);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    LUXE<span className="text-accent">STORE</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-accent transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/shop" className="hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                    </Link>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Wishlist Icon */}
                    <Link href="/wishlist" className="relative hover:text-accent transition-colors">
                        <Heart className="w-5 h-5" />
                        {isWishlistLoaded && wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </Link>

                    {/* User Dropdown/Auth */}
                    {!isAuthLoading && (
                        user ? (
                            <div className="relative group">
                                <Link href="/account" className="hover:text-accent transition-colors flex items-center">
                                    <User className="w-5 h-5" />
                                </Link>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border shadow-lg rounded-md overflow-hidden hidden group-hover:block z-50">
                                    <div className="p-3 border-b border-border">
                                        <p className="font-bold text-sm truncate">{user.name}</p>
                                        <p className="text-xs text-muted truncate">{user.email}</p>
                                    </div>
                                    <Link href="/account" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">Dashboard</Link>
                                    <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">My Orders</Link>
                                    <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">Wishlist</Link>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-500 transition-colors flex items-center">
                                        <LogOut className="w-3 h-3 mr-2" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="hover:text-accent transition-colors">
                                <User className="w-5 h-5" />
                            </Link>
                        )
                    )}

                    <Link href="/cart" className="relative hover:text-accent transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        {isCartLoaded && cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex items-center space-x-6 border-t border-border">
                                <ThemeToggle />
                                <button className="flex items-center space-x-2">
                                    <Search className="w-5 h-5" />
                                    <span>Search</span>
                                </button>
                                <Link href="/cart" className="flex items-center space-x-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    <span>Cart ({isLoaded ? cartCount : 0})</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
