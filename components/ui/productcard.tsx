"use client";

import React from "react";
import Link from "next/link";
import "./productcard.css";
import Button from "./button";
import type { Product } from "@/lib/shop/ListProducts";


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
      {product.images?.[0] ?(
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
      ) : (
        <div className="product-image-placeholder">Product Image</div>
      )}

      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
          <p className="product-price">${product.price}</p>
          {product.rating ? (
            <span className="product-rating">⭐ {product.rating}</span>
          ) : (
            <span className="product-rating">No reviews yet</span>
          )}
        </div>

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