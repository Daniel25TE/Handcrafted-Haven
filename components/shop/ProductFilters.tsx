"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6">
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="w-full md:w-1/3 border rounded-md px-4 py-2"
      />

      {/* Sort */}
      <select
        onChange={handleSortChange}
        className="border rounded-md px-4 py-2"
      >
        <option value="featured">Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}