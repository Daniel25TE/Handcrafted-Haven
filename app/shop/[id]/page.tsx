import { getProducts } from "@/lib/shop/ListProducts";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ReviewSection from "@/components/reviews/ReviewSection";
import '../shop.css';
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <main className="container py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center aspect-square relative overflow-hidden border border-[#E5DEC9]">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 transition-all hover:scale-105"
              priority
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <span className="text-4xl">🖼️</span>
              <p>No image available</p>
            </div>
          )}
        </div>

        <div className="flex flex-col">

          <h1 className="text-4xl md:text-5xl font-bold text-[#3D4127] font-[var(--font-dancing-script)] mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-[#C76B4F]">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="bg-[#3D4127]/10 text-[#3D4127] px-3 py-1 rounded-full text-sm font-medium">
              {product.rating ? `⭐ ${product.rating}` : 'No reviews yet'}
            </span>
          </div>

          <div className="prose prose-stone mb-8">
            <p className="text-[#6A4E42] text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <AddToCartButton product={product} />
            <Link href="/shop" className="product-button btn btn-secondary w-full text-center">
             ← Back to shop
          </Link>
            
            <p className="text-xs text-[#6A4E42]/60 text-center md:text-left">
              Secure checkout • Handcrafted quality guaranteed
            </p>
          </div>
        </div>
      </div>
      <ReviewSection productId={id} />
    </main>
  );
}