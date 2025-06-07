"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

async function getPosts(search: string | null) {
  const res = await fetch(search
    ? `https://dummyjson.com/posts/tag/${search}?limit=10`
    : "https://dummyjson.com/posts?limit=10");
  const data = await res.json();
  return data.posts;
}

async function getTags() {
  const res = await fetch('https://dummyjson.com/posts/tag-list');
  const data = await res.json();
  return data;
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  // const [search, setSearch] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    setPosts([]);
    const delay = setTimeout(() => {
      getPosts(selectedTag).then(setPosts);
      getTags().then(setTagList);
    }, 300);

    return () => clearTimeout(delay);
  }, [selectedTag]);

  return (
    <main>
      <div className="wrapper">
        <h1>My Blog</h1>
        <div className="filter-wrapper">
          {/* <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        /> */}

         <select
            onChange={(e) => setSelectedTag(e.target.value)}
            value={selectedTag}
          >
            <option value="">All Tags</option>
            {tagList.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))
          ) : (
            <li>Loading...</li> // Always show a placeholder initially
          )}
        </ul>

      </div>
    </main>
  );
}
