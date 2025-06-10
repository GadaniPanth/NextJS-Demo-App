"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TagFilter({ tags }: { tags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tag") || "";

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
    <select
      value={selectedTag}
      onChange={(e) => updateURL("tag", e.target.value)}
    >
      <option value="">All Tags</option>
      {tags.map((tag, i) => (
        <option key={i} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
