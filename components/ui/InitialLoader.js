"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function InitialLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure the loader stays for at least 1.5s for branding visibility
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="relative">
                        {/* Logo Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-bold tracking-tighter"
                        >
                            LUXE<span className="text-accent">STORE</span>
                        </motion.h1>

                        {/* Animated Line underneath logo */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                            className="h-[2px] bg-accent w-full mt-2 origin-left"
                        />
                    </div>

                    {/* Subtle pulse background */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1.2 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl -z-10"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-12 text-sm tracking-widest uppercase font-medium"
                    >
                        Premium Curated Collection
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
