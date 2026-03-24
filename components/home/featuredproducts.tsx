"use client";

import "./featuredproducts.css";
import ProductCard, { Product } from "../shared/productcard";

const products: Product[] = [
  {
    id: "1",
    name: "Handwoven Basket",
    price: 28,
    image: "/images/basket.jpg",
  },
  {
    id: "2",
    name: "Ceramic Mug",
    price: 22,
    image: "/images/mug.jpg",
  },
  {
    id: "3",
    name: "Knitted Scarf",
    price: 35,
    image: "/images/scarf.jpg",
  },
];

export default function FeaturedProducts() {
  const products: Product[] = [
    { id: "1", name: "Handwoven Basket", price: 28, image: "/images/basket.jpg" },
    { id: "2", name: "Ceramic Mug", price: 22, image: "/images/mug.jpg" },
    { id: "3", name: "Knitted Scarf", price: 35, image: "/images/scarf.jpg" },
  ];

  const handleAddToCart = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existing, { ...product, quantity: 1 }]));
  };

  return (
    <section className="featured-products">
      <div className="featured-products-container">
        <p className="section-tag">Featured Collection</p>
        <h2>Handpicked Favorites</h2>
        <p className="section-text">
          Explore a few of the unique handcrafted items available in our
          marketplace.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}