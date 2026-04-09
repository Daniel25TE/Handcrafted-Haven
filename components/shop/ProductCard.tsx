import Link from "next/link";
import type { Product } from "@/lib/shop/ListProducts";
import "./product-card.css";

export default function ProductCard({ product }: { product: Product }) {
  const firstImage =
    Array.isArray(product.images) &&
    typeof product.images[0] === "string"
      ? product.images[0].trim()
      : "";

  const imageSrc =
    firstImage && firstImage !== "null" && firstImage !== "undefined"
      ? firstImage
      : "/placeholder-img.png";

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={imageSrc}
          alt={product.name}
          className="product-card-image"
        />
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>

        <p className="product-card-description">{product.description}</p>

        <div className="product-card-meta">
          <p className="product-card-price">
            ${Number(product.price).toFixed(2)}
          </p>

          {product.rating ? (
            <span className="product-card-rating">⭐ {product.rating}</span>
          ) : (
            <span className="product-card-rating">No reviews yet</span>
          )}
        </div>

        <div className="product-card-actions">
          <Link
            href={`/shop/${product.id}`}
            className="btn btn-secondary w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}