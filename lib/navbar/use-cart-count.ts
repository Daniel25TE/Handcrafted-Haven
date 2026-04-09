"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "./navbar.types";

export function useCartCount() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window === "undefined") return;

      const stored = JSON.parse(
        localStorage.getItem("cart") || "[]"
      ) as CartItem[];

      const totalCount = stored.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    };

    updateCartCount();

    const handleCartUpdated = () => updateCartCount();

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleCartUpdated);
    };
  }, []);

  return cartCount;
}