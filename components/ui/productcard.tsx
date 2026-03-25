"use client";

import React from "react";
import Link from "next/link";
import "./productcard.css";
import Button from "./button";

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
  variant?: "default" | "home";
}

export default function ProductCard({
  product,
  onAddToCart,
  className = "",
  variant = "default",
}: ProductCardProps) {
  return (
    <article className={`product-card ${className}`.trim()}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      ) : (
        <div className="product-image-placeholder">Product Image</div>
      )}

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>

        {variant === "home" && product.description && (
          <p className="product-description">{product.description}</p>
        )}

        {variant === "home" ? (
          <Link href={`/shop/${product.id}`}>
            <Button type="button">View Details</Button>
          </Link>
        ) : (
          <Button
            type="button"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </article>
  );
}