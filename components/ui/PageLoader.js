"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Trigger loader on route change
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
            {isLoading && (
                <motion.div
                    initial={{ width: "0%", opacity: 1 }}
                    animate={{
                        width: ["0%", "30%", "70%", "100%"],
                        opacity: [1, 1, 1, 0]
                    }}
                    transition={{
                        duration: 0.8,
                        times: [0, 0.2, 0.7, 1],
                        ease: "easeInOut"
                    }}
                    className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent),0.5)]"
                />
            )}
        </div>
    );
}
