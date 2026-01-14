"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted user
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login
        // In a real app, you'd validate against an API
        const mockUser = {
            id: '123',
            name: 'John Doe',
            email: email,
            avatar: null
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
    };

    const signup = (name, email, password) => {
        // Mock signup
        const mockUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: null
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
