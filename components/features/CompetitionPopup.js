"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Trophy, MapPin, ExternalLink, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CompetitionPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Temporary: Disable localStorage check for review
            setIsVisible(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        localStorage.setItem("competition_popup_seen", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-100 flex items-center justify-center px-4 overflow-hidden pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, type: "spring", damping: 20 }}
                        className="relative w-full max-w-md bg-background border border-accent/40 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Status bar */}
                        <div className="bg-accent h-1.5 w-full" />

                        {/* Content */}
                        <div className="p-6 relative">
                            {/* Close button */}
                            <button
                                onClick={closePopup}
                                className="absolute top-4 right-4 text-muted hover:text-accent transition-all p-2 rounded-full hover:bg-accent/10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-accent/10 p-4 rounded-full mb-4 border border-accent/20 relative"
                                >
                                    <Trophy className="w-10 h-10 text-accent" />
                                    <motion.div
                                        animate={{ 
                                            rotate: [0, 360],
                                            scale: [1, 1.2, 1] 
                                        }}
                                        transition={{ 
                                            duration: 5, 
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute -top-1 -right-1 text-accent"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                    </motion.div>
                                </motion.div>
                                <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-1">Achievement Spotlight</h4>
                                <h2 className="text-3xl font-extrabold tracking-tighter mb-3 uppercase">XR HACKATHON 3.0</h2>
                                <div className="h-1 w-16 bg-accent/30 rounded-full" />
                            </div>

                            {/* Body */}
                            <div className="space-y-5">
                                <div className="bg-secondary/40 rounded-xl p-4 border border-border relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                                    <p className="text-foreground leading-relaxed text-center italic text-base">
                                        "Developed for the inter-university tech event at <strong>Forman Christian College</strong>, showcasing excellence in design and development."
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-background/50 p-3 rounded-lg border border-border/50">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 bg-accent/20 rounded-md">
                                            <Award className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-base text-accent">12<sup>th</sup> Place</p>
                                            <p className="text-[9px] uppercase tracking-widest text-muted">Worldwide Pos</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 bg-accent/20 rounded-md">
                                            <MapPin className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs">FCCU, Lahore</p>
                                            <p className="text-[9px] uppercase tracking-widest text-muted">Competition Host</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center pt-2">
                                    <p className="text-[10px] text-muted mb-2 uppercase tracking-[0.3em]">Proudly Representing</p>
                                    <div className="inline-block px-4 py-2 border border-accent/20 rounded-full bg-accent/5">
                                        <h3 className="text-lg font-black text-foreground">Lahore Garrison University</h3>
                                    </div>
                                    <p className="text-[9px] text-accent mt-3 tracking-[0.4em] font-bold uppercase animate-pulse">
                                        SE-TECH SOCIETY EXCELLENCE
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-4 border-t border-border/50">
                                <Button
                                    onClick={closePopup}
                                    variant="primary"
                                    className="w-full h-12 text-sm font-bold tracking-[0.2em] uppercase transition-all hover:bg-accent hover:text-accent-foreground rounded-xl"
                                >
                                    Proceed to Store <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>


                        {/* Decorative background splashes */}
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
