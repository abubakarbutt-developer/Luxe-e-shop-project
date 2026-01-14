"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Package, MapPin, Heart, LogOut, User } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AccountPage() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) return <div className="min-h-screen pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
                    <Button variant="outline" onClick={logout} className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200">
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                </div>

                <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-muted">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/account/orders" className="bg-secondary/30 p-6 rounded-lg border border-border hover:border-accent transition-colors group">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Package className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">My Orders</h3>
                        <p className="text-muted text-sm">View order status and history.</p>
                    </Link>

                    <Link href="/account/addresses" className="bg-secondary/30 p-6 rounded-lg border border-border hover:border-accent transition-colors group">
                        <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Addresses</h3>
                        <p className="text-muted text-sm">Manage shipping addresses.</p>
                    </Link>

                    <Link href="/wishlist" className="bg-secondary/30 p-6 rounded-lg border border-border hover:border-accent transition-colors group">
                        <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Wishlist</h3>
                        <p className="text-muted text-sm">Your favorite products.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
