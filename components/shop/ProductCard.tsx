import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/shop/ListProducts";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex flex-col h-full hover:shadow-lg transition-shadow">
      
      <div className="relative h-64 w-full mb-4 overflow-hidden rounded-xl bg-white">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
            <span>No Image Available</span>
          </div>
        )}
      </div>

      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-[#3D4127] font-[var(--font-dancing-script)] leading-tight">
          {product.name}
        </h3>

        <p className="text-sm text-[#6A4E42] mt-2 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[#C76B4F] font-bold text-lg">
            ${Number(product.price).toFixed(2)}
          </p>
          {product.rating && (
            <span className="text-sm text-[#3D4127]/70 font-medium">
              ⭐ {product.rating}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link href={`/shop/${product.id}`} className="btn btn-secondary w-full text-center">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}