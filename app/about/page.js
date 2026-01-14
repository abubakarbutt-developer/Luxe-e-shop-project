"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        About <span className="text-accent">LuxeStore</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted leading-relaxed"
                    >
                        We are dedicated to bringing you the finest selection of premium products.
                        Our mission is to combine quality, style, and sustainability in everything we offer.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Store"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-muted leading-relaxed">
                            Founded in 2023, LuxeStore began with a simple idea: luxury shouldn't be unattainable.
                            We search the globe for artisans and designers who share our passion for excellence.
                        </p>
                        <p className="text-muted leading-relaxed">
                            Every item in our collection is handpicked and rigorously tested to ensure it meets our high standards.
                            We believe that the products you use every day should bring you joy and last a lifetime.
                        </p>
                    </motion.div>
                </div>

                <div className="bg-secondary/20 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quality First</h3>
                            <p className="text-muted">We never compromise on the quality of materials or craftsmanship.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Sustainable</h3>
                            <p className="text-muted">We are committed to reducing our environmental footprint.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Customer Focus</h3>
                            <p className="text-muted">Your satisfaction is our top priority, plain and simple.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
