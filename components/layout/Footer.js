import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter">
                            LUXE<span className="text-accent">STORE</span>
                        </h3>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            Elevating your lifestyle with premium products curated for quality and style.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base">Shop</h4>
                        <ul className="space-y-3 text-sm text-muted">
                            <li><Link href="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link href="/bestsellers" className="hover:text-accent transition-colors">Bestsellers</Link></li>
                            <li><Link href="/accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base">Support</h4>
                        <ul className="space-y-3 text-sm text-muted">
                            <li><Link href="/faqs" className="hover:text-accent transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="font-semibold mb-4 text-base">Newsletter</h4>
                        <p className="text-sm text-muted mb-6 max-w-md">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex group max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-background border border-border border-r-0 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all rounded-l-lg"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-accent transition-all rounded-r-lg"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-muted/20 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
                    <p>&copy; {new Date().getFullYear()} LuxeStore. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
