// src/hooks/useCart.ts
import { useState } from "react";
import type { Cart, CartItem } from "../types/cart";
import type { Food } from "../types/food";

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    _id: "",
    user: "",
    items: [],
  });

  const addToCart = (food: Food) => {
    setCart((prev) => {
      const existing = prev.items.find((item) => item.food._id === food._id);

      let updatedItems: CartItem[];

      if (existing) {
        updatedItems = prev.items.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...prev.items, { food, quantity: 1 }];
      }

      return { ...prev, items: updatedItems };
    });
  };

  const removeFromCart = (foodId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.food._id !== foodId),
    }));
  };

  const clearCart = () => {
    setCart((prev) => ({ ...prev, items: [] }));
  };

  // derived value (NOT stored)
  const total = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );

  return {
    cart,
    items: cart.items,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
