"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
        setCartItems((prevItems) => {
            // Create a unique ID for the item based on product ID and variants
            // Use a composite key or just check properties
            const existingItemIndex = prevItems.findIndex(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                // Add new item
                return [...prevItems, {
                    ...product,
                    quantity,
                    selectedSize,
                    selectedColor
                }];
            }
        });
    };

    const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) => !(
                    item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                )
            )
        );
    };

    const updateQuantity = (productId, quantity, selectedSize = null, selectedColor = null) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (
                    item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                ) {
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = cartItems.reduce((acc, item) => {
        const price = item.salePrice || item.price;
        return acc + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isLoaded
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
