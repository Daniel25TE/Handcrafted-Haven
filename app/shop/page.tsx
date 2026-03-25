import ProductCard from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { products } from "@/lib/shop/ListProducts";
import type { Product } from "@/lib/shop/ListProducts";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function filterAndSort(items: Product[], params: any) {
  let list = [...items];

  const q =
    typeof params?.q === "string"
      ? params.q.toLowerCase()
      : "";

  const sort =
    typeof params?.sort === "string"
      ? params.sort
      : "featured";


  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }


  if (sort === "price_asc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = searchParams;

  const items = filterAndSort(products, params);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-greenfont mb-6">
        Shop Handmade Products
      </h1>

      {/* Filters */}
      <ProductFilters />

      {/* Grid */}
      {items.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold text-greenfont">
            No products found
          </h2>
          <p className="text-warmBrown mt-2">
            Try adjusting your search
          </p>
        </div>
      )}
    </main>
  );
}