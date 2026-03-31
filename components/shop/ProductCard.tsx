import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/shop/ListProducts";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-lg border bg-white shadow-sm hover:shadow-md overflow-hidden">
      <Link href={`/shop/${product.id}`} className="block">
        
        {/* Image */}
        <div className="relative h-48 w-full bg-sand">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name || "Product image"}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-greenfont">
            {product.name}
          </h3>

          <p className="text-sm text-warmBrown mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-terracotta">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-sm text-gray-500">
              ⭐ {product.rating}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}