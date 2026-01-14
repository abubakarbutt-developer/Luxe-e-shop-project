import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter">
                            LUXE<span className="text-accent">STORE</span>
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Elevating your lifestyle with premium products curated for quality and style.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted">
                            <li><Link href="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link href="/bestsellers" className="hover:text-accent transition-colors">Bestsellers</Link></li>
                            <li><Link href="/accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted">
                            <li><Link href="/faqs" className="hover:text-accent transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">Newsletter</h4>
                        <p className="text-sm text-muted mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors rounded-l-md"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors rounded-r-md"
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
