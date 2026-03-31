"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Product } from "@/types/product";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./cart.css";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart safely
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");

      const normalized = stored.map((item: CartItem) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));

      setCart(normalized);
    } catch (err) {
      console.error("Cart load error:", err);
      setCart([]);
    }
  }, []);

  // Save helper
  const saveCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove item
  const handleRemove = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Increase quantity
  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
        : item
    );
    saveCart(updated);
  };

  // Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-row">

            {/* Image */}
            <div className="cart-image">
              <img
                src={item.image_url || "/placeholder.jpg"}
                alt={item.name || "Product image"}
              />
            </div>

            {/* Info */}
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p className="price">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="cart-qty">
              <button onClick={() => decreaseQty(item.id)}>
                −
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQty(item.id)}>
                +
              </button>
            </div>

            {/* Remove */}
            <div className="cart-actions">
              <Button onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))
      )}

      <h2 className="cart-total">
        Total: ${total.toFixed(2)}
      </h2>

      <div className="cart-checkout">
        <Button
          onClick={() => (window.location.href = "/checkout")}
        >
          Go to Checkout
        </Button>
      </div>
    </main>
  );
}