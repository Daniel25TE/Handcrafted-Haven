"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Product } from "@/components/shared/productcard";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./cart.css";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

const handleRemove = (id: string) => {
  const updated = cart.filter((item) => item.id !== id);
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
  window.dispatchEvent(new Event("cartUpdated"));
};

const handleQuantityChange = (id: string, quantity: number) => {
  const updated = cart.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );

  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
  window.dispatchEvent(new Event("cartUpdated"));
};

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

return (
  <>
    <Navbar />

    <main className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, Number(e.target.value))
              }
            />

            <Button onClick={() => handleRemove(item.id)}>
              Remove
            </Button>
          </div>
        ))
      )}

      <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>

      <div className="cart-actions">
        <Button onClick={() => (window.location.href = "/checkout")}>
          Go to Checkout
        </Button>
      </div>
    </main>

    <Footer />
  </>
);
}