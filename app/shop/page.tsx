import { Suspense } from 'react';
import Search from '@/components/ui/search';
import ProductCard from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { getProducts } from "@/lib/shop/ListProducts";
import './shop.css';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-");
}

function filterAndSort(products: any[], params: any) {
  let list = [...products];

  const q =
    typeof params?.q === "string"
      ? params.q.toLowerCase()
      : "";

  const category =
    typeof params?.category === "string"
      ? decodeURIComponent(params.category).toLowerCase()
      : "all";

  const sort =
    typeof params?.sort === "string"
      ? params.sort
      : "featured";

  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (category !== "all") {
    list = list.filter(
      (p) => slugifyCategory(p.category) === category
    );
  }

  switch (sort) {
    case "price_asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
  }

  return list;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const products = await getProducts();
  const items = filterAndSort(products, params);

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="container mx-auto px-4">
          <div className="shop-hero-content">
            <p className="section-tag">Handcrafted Haven Shop</p>
            <h1>Shop Handmade Products</h1>
            <p className="shop-intro">
              Discover unique creations crafted with passion. Every purchase supports 
              an artisan and brings a one-of-a-kind story into your home.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12 pb-20">
        
        <ProductFilters />

        {items.length > 0 ? (
        
          <div className="my-16 products-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-xl text-[#6A4E42]">No products found.</p>
          </div>
        )}
      </div>
    </main>
  );
}