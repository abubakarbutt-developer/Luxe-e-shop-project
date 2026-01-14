import { Truck, MapPin, Clock } from "lucide-react";

export default function ShippingPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Shipping & Delivery</h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        We strive to deliver your premium products as quickly and safely as possible.
                        Below you will find all the details regarding our shipping policies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping Charges */}
                    <div className="bg-secondary/30 p-8 rounded-lg border border-border">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mr-4">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Shipping Charges</h2>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex justify-between border-b border-border pb-2">
                                <span>Standard Shipping</span>
                                <span className="font-semibold text-foreground">PKR 500</span>
                            </li>
                            <li className="flex justify-between border-b border-border pb-2">
                                <span>Orders above PKR 5,000</span>
                                <span className="font-bold text-green-500">FREE</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-muted">
                            * Shipping charges are calculated at checkout based on the final order value.
                        </p>
                    </div>

                    {/* Estimated Delivery Time */}
                    <div className="bg-secondary/30 p-8 rounded-lg border border-border">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mr-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Delivery Time</h2>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex justify-between border-b border-border pb-2">
                                <span>Major Cities (Karachi, Lahore, Islamabad)</span>
                                <span className="font-semibold text-foreground">2-3 Working Days</span>
                            </li>
                            <li className="flex justify-between border-b border-border pb-2">
                                <span>Other Cities & Rural Areas</span>
                                <span className="font-semibold text-foreground">3-5 Working Days</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-muted">
                            * Delivery times may vary during public holidays and sales events.
                        </p>
                    </div>

                    {/* Delivery Areas */}
                    <div className="md:col-span-2 bg-secondary/30 p-8 rounded-lg border border-border">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mr-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Delivery Areas</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            We currently deliver to all major cities and districts across Pakistan. Our courier partners ensure reach to even remote locations.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                            <span>Karachi</span>
                            <span>Lahore</span>
                            <span>Islamabad</span>
                            <span>Rawalpindi</span>
                            <span>Faisalabad</span>
                            <span>Multan</span>
                            <span>Peshawar</span>
                            <span>Quetta</span>
                            <span>Sialkot</span>
                            <span>Gujranwala</span>
                            <span>Hyderabad</span>
                            <span>Bahawalpur</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
