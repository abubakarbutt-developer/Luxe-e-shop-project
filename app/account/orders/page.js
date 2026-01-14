"use client";

import Link from "next/link";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";

export default function OrdersPage() {
    // Mock Orders
    const orders = [
        { id: "#ORD-9384", date: "Jan 10, 2024", total: "PKR 12,500", status: "Delivered", statusColor: "text-green-500" },
        { id: "#ORD-8273", date: "Dec 28, 2023", total: "PKR 5,400", status: "Processing", statusColor: "text-blue-500" },
        { id: "#ORD-1928", date: "Nov 15, 2023", total: "PKR 22,000", status: "Delivered", statusColor: "text-green-500" },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Link href="/account" className="text-muted hover:text-accent transition-colors flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Account
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-secondary/30 p-6 rounded-lg border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-secondary rounded-full">
                                    <Package className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{order.id}</h3>
                                    <p className="text-sm text-muted">Placed on {order.date}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:items-end w-full sm:w-auto">
                                <span className="font-bold">{order.total}</span>
                                <span className={`text-sm font-medium ${order.statusColor}`}>{order.status}</span>
                            </div>
                            <Link href="#" className="hidden sm:block text-muted hover:text-accent">
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
