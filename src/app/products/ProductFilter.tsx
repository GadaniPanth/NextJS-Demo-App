"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilter({
  categories,
}: {
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="filter-wrapper">
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search"
        defaultValue={searchQuery}
        onChange={(e) => updateURL("search", e.target.value)}
      />

      <select
        defaultValue={selectedCategory}
        onChange={(e) => updateURL("category", e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
