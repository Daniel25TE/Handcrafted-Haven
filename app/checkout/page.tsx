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

  // Shipping state
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Billing / payment state
  const [billing, setBilling] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // Load cart
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
      shipping,
      billing,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("Order submitted:", order);

    // Clear cart
    localStorage.removeItem("cart");
    setCart([]);

    // Clear form
    setShipping({
      fullName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });

    setBilling({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      address: "",
    });

    // Show toast
    setShowToast(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
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
                  {item.quantity} × ${item.price.toFixed(2)} = $
                  {(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* FORM */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={shipping.fullName}
          onChange={(e) =>
            setShipping({ ...shipping, fullName: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={shipping.address}
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="City"
          value={shipping.city}
          onChange={(e) =>
            setShipping({ ...shipping, city: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="State"
          value={shipping.state}
          onChange={(e) =>
            setShipping({ ...shipping, state: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="ZIP Code"
          value={shipping.zip}
          onChange={(e) =>
            setShipping({ ...shipping, zip: e.target.value })
          }
          required
        />

        <h2>Payment Information</h2>

        <input
          type="text"
          placeholder="Name on Card"
          value={billing.cardName}
          onChange={(e) =>
            setBilling({ ...billing, cardName: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Card Number"
          value={billing.cardNumber}
          onChange={(e) =>
            setBilling({ ...billing, cardNumber: e.target.value })
          }
          required
        />

        <div className="card-row">
          <input
            type="text"
            placeholder="MM/YY"
            value={billing.expiry}
            onChange={(e) =>
              setBilling({ ...billing, expiry: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="CVV"
            value={billing.cvv}
            onChange={(e) =>
              setBilling({ ...billing, cvv: e.target.value })
            }
            required
          />
        </div>

        <input
          type="text"
          placeholder="Billing Address"
          value={billing.address}
          onChange={(e) =>
            setBilling({ ...billing, address: e.target.value })
          }
          required
        />

        <h2 className="checkout-total">
          Total: ${total.toFixed(2)}
        </h2>

        <Button type="submit">Place Order</Button>
      </form>

      {/* TOAST */}
      {showToast && (
        <div className="checkout-toast">
          ✅ Order placed successfully!
        </div>
      )}
    </main>
  );
}