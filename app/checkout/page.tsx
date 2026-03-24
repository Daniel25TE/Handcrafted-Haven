"use client";

import React, { useEffect, useState, FormEvent } from "react";
import Button from "@/components/shared/button";
import { Product } from "@/components/shared/productcard";
import "./checkout.css";

interface CartItem extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Load cart
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
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
    };

    console.log("Order submitted:", order);

    // Clear cart after checkout
    localStorage.removeItem("cart");
  };

  return (
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <h2 className="checkout-total">Total: ${total.toFixed(2)}</h2>

        <Button type="submit">Place Order</Button>
      </form>
    </div>
  );
}