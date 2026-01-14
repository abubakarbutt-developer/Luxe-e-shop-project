"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, CheckCircle, Truck, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Mock random status logic or success for demo
            if (orderId) {
                setStatus({
                    id: orderId,
                    currentStep: 2, // 0: Processing, 1: Shipped, 2: Out for Delivery, 3: Delivered
                    steps: [
                        { title: "Order Placed", date: "Jan 10, 2024", completed: true, icon: Package },
                        { title: "Shipped", date: "Jan 11, 2024", completed: true, icon: Truck },
                        { title: "Out for Delivery", date: "Jan 12, 2024", completed: true, icon: MapPin }, // Current
                        { title: "Delivered", date: "Expected Jan 12, 2024", completed: false, icon: CheckCircle },
                    ]
                });
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Track Your Order</h1>
                    <p className="text-muted">
                        Enter your order ID and email to check the current status of your shipment.
                    </p>
                </div>

                <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-12">
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <label htmlFor="orderId" className="block text-sm font-medium mb-1">Order ID</label>
                            <input
                                type="text"
                                id="orderId"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="e.g. #12345"
                                required
                                className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email / Phone</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email or phone"
                                required
                                className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Tracking..." : "Track Order"}
                        </Button>
                    </form>
                </div>

                {/* Status Timeline */}
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background border border-border rounded-lg p-8"
                    >
                        <h2 className="text-xl font-bold mb-6">Order Status: #{status.id}</h2>
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border transform -translate-x-1/2 md:left-auto md:top-6 md:right-0 md:left-0 md:h-0.5 md:w-full md:bottom-auto"></div>

                            <div className="flex flex-col md:flex-row justify-between relative space-y-8 md:space-y-0">
                                {status.steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = index === status.currentStep;
                                    const isCompleted = index <= status.currentStep;

                                    return (
                                        <div key={index} className="flex md:flex-col items-start md:items-center relative z-10 group">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors ${isCompleted
                                                    ? "bg-accent border-accent text-accent-foreground"
                                                    : "bg-background border-border text-muted"
                                                }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="ml-4 md:ml-0 md:mt-4 md:text-center">
                                                <h3 className={`font-semibold ${isActive ? "text-accent" : isCompleted ? "text-foreground" : "text-muted"}`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-xs text-muted mt-1">{step.date}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
