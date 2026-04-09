"use client";

import { useState } from "react";
import { useNavbarAuth } from "@/lib/navbar/use-navbar-auth";
import "@/app/shop/shop.css";

export default function AddToCartButton({ product }: { product: any }) {
  const [added, setAdded] = useState(false);
  const { profile, loadingUser } = useNavbarAuth(() => {});
  const isAdmin = profile?.role === "admin";

  const handleAdd = () => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = stored.find((item: any) => item.id === product.id);

    let updated;

    if (existing) {
      updated = stored.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...stored,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.images?.[0],
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  if (loadingUser || isAdmin) {
    return null;
  }

  return (
    <button
      onClick={handleAdd}
      className="product-button btn btn-secondary w-full text-center"
    >
      {added ? "Added ✅" : "Add to Cart"}
    </button>
  );
}