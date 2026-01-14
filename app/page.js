"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/features/product/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        const allProducts = await productsRes.json();
        const cats = await categoriesRes.json();

        setFeaturedProducts(allProducts.filter(p => [1, 2, 3, 4].includes(p.id)));
        setCategories(cats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Hero Background"
          fill
          className="object-cover z-0 brightness-50"
          priority
        />
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Redefine Your <span className="text-accent">Style</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Discover the latest trends in luxury fashion and accessories. curated for the modern individual.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/shop">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2>
              <p className="text-muted">Handpicked favorites just for you.</p>
            </div>
            <Link href="/shop" className="text-primary font-medium hover:text-accent transition-colors flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={`/shop?category=${category.name.toLowerCase()}`} className="group relative h-96 rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white tracking-widest uppercase border-2 border-white px-8 py-3 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-muted max-w-xs">On all orders over PKR 5,000. Delivered safely to your door.</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshToken className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
              <p className="text-muted max-w-xs">30-day return policy for a hassle-free shopping experience.</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
              <p className="text-muted max-w-xs">Advanced encryption to keep your transaction details safe.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function RefreshToken(props) {
  return <RefreshCw {...props} />
}
