"use client";

import { useEffect, useState } from "react";
import "./featuredproducts.css";
import ProductCard from "../ui/productcard"; 
import { getProducts } from "@/lib/shop/ListProducts";
import type { Product } from "@/lib/shop/ListProducts";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  async function loadProducts() {
    const data = await getProducts();

    const normalized = (data as any[]).map((p) => ({
      ...p,
      image: p.image_url || "/placeholder.jpg",
    }));

    const featured = [...normalized]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    setProducts(featured);
  }

  loadProducts();
}, []);

  const handleAddToCart = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    localStorage.setItem(
      "cart",
      JSON.stringify([...existing, { ...product, quantity: 1 }])
    );
  };

  return (
    <section className="featured-products">
      <div className="featured-products-container">
        <p className="section-tag">Featured Collection</p>
        <h2>Handpicked Favorites</h2>
        <p className="section-text">
          Explore a few of the highest-rated handcrafted items in our marketplace.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              className="show"
              variant="home"
            />
          ))}
        </div>
      </div>
    </section>
  );
}