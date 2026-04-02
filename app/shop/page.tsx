import ProductCard from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { getProducts } from "@/lib/shop/ListProducts";
import type { Product } from "@/lib/shop/ListProducts";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

    default:
      break;
  }

  return list;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;

  // ✅ FIX: await the async function
  const productList = await getProducts();

  const items = filterAndSort(productList, params);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-greenfont mb-6">
        Shop Handmade Products
      </h1>

      <ProductFilters />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}