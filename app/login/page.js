"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (password.length < 6) {
            setError("Invalid credentials (mock: password must be > 6 chars)");
            setIsLoading(false);
            return;
        }

        const success = login(email, password);
        if (success) {
            router.push("/account");
        } else {
            setError("Failed to login");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-lg border border-border bg-secondary/30">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-accent hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
