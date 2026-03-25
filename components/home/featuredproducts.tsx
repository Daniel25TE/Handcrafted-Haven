"use client";

import "./featuredproducts.css";
import ProductCard, { Product } from "../shared/productcard";

const products: Product[] = [
  {
    id: "1",
    name: "Handwoven Basket",
    price: 28,
    image: "",
    description: "A carefully woven storage basket made from natural fibers.",
  },
  {
    id: "2",
    name: "Ceramic Mug",
    price: 22,
    image: "",
    description: "A handmade mug with earthy tones and a rustic finish.",
  },
  {
    id: "3",
    name: "Knitted Scarf",
    price: 35,
    image: "",
    description: "A soft and cozy scarf crafted with comfort and style in mind.",
  },
];

export default function FeaturedProducts() {
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
          Explore a few of the unique handcrafted items available in our
          marketplace.
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