"use client";

import React from "react";
import "./productcard.css";
import Button from "./button";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const handleAdd = () => {
    // Local storage fallback (so cart works even without global state)
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = [...existing, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Trigger parent handler if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <Button onClick={handleAdd}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;