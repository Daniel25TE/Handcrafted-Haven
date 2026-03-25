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
    <div className="flex gap-4 mt-4">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="border px-4 py-2 rounded-md"
      />

      <select
        onChange={handleSortChange}
        className="border px-4 py-2 rounded-md"
      >
        <option value="featured">Featured</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}