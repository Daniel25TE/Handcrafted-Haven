"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { Product } from "@/types/product";
import "./checkout.css";

interface CartItem extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Load cart safely
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    } catch (err) {
      console.error("Checkout cart load error:", err);
      setCart([]);
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      name,
      address,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("Order submitted:", order);

    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <main className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {/* CART SUMMARY */}
      <section className="checkout-summary">
        <h2>Your Items</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="checkout-item">

              <img
                src={item.image_url || "/placeholder.jpg"}
                alt={item.name}
                className="checkout-item-image"
              />

              <div className="checkout-item-info">
                <p>{item.name}</p>
                <p>
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>

            </div>
          ))
        )}
      </section>

      {/* FORM */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <h2 className="checkout-total">
          Total: ${total.toFixed(2)}
        </h2>

        <Button type="submit">Place Order</Button>
      </form>
    </main>
  );
}