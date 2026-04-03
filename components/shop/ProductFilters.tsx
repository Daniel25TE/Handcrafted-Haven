"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/shop?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams("q", e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams("sort", e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams("category", e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-4 py-4 items-center">
      
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="border px-4 py-2 rounded-md w-full sm:w-64"
        style={{ margin: "1rem" }}
      />

      <select
        onChange={handleCategoryChange}
        className="border px-4 py-2 rounded-md w-full sm:w-48"
        style={{ margin: "1rem" }}
      >
        <option value="all">All Categories</option>
        <option value="home-decor">Home Decor</option>
        <option value="accessories">Accessories</option>
        <option value="kitchen">Kitchen</option>
        <option value="gifts">Gifts</option>
      </select>

      <select
        onChange={handleSortChange}
        className="border px-4 py-2 rounded-md w-full sm:w-48"
        style={{ margin: "1rem" }}
      >
        <option value="featured">Featured</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}