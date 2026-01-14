"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Plus, Edit2, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AddressesPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link href="/account" className="text-muted hover:text-accent transition-colors flex items-center mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Account
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">Saved Addresses</h1>
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Add New Address
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Address */}
                    <div className="bg-secondary/30 p-6 rounded-lg border border-accent relative">
                        <span className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded">
                            Default
                        </span>
                        <div className="flex items-center space-x-3 mb-4">
                            <MapPin className="w-5 h-5 text-accent" />
                            <h3 className="font-bold">Home</h3>
                        </div>
                        <address className="text-muted text-sm not-italic mb-6 space-y-1">
                            <p className="font-medium text-foreground">John Doe</p>
                            <p>123 Street Name, Phase 6</p>
                            <p>DHA, Lahore</p>
                            <p>Pakistan</p>
                            <p className="mt-2 text-foreground">0300-1234567</p>
                        </address>
                        <div className="flex space-x-4">
                            <button className="text-sm font-medium flex items-center hover:text-accent transition-colors">
                                <Edit2 className="w-3 h-3 mr-1" /> Edit
                            </button>
                            <button className="text-sm font-medium flex items-center text-red-500 hover:text-red-600 transition-colors">
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                            </button>
                        </div>
                    </div>

                    {/* Other Address */}
                    <div className="bg-secondary/30 p-6 rounded-lg border border-border">
                        <div className="flex items-center space-x-3 mb-4">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-bold">Office</h3>
                        </div>
                        <address className="text-muted text-sm not-italic mb-6 space-y-1">
                            <p className="font-medium text-foreground">John Doe</p>
                            <p>Office 404, Tech Tower</p>
                            <p>Blue Area, Islamabad</p>
                            <p>Pakistan</p>
                            <p className="mt-2 text-foreground">0300-1234567</p>
                        </address>
                        <div className="flex space-x-4">
                            <button className="text-sm font-medium flex items-center hover:text-accent transition-colors">
                                <Edit2 className="w-3 h-3 mr-1" /> Edit
                            </button>
                            <button className="text-sm font-medium flex items-center text-red-500 hover:text-red-600 transition-colors">
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
