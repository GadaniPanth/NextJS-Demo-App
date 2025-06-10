// "use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
import TagFilter from "./TagFilter";

async function getPosts(search: string | null) {
  const res = await fetch(
    search
      ? `https://dummyjson.com/posts/tag/${search}?limit=10`
      : "https://dummyjson.com/posts?limit=10"
  );
  const data = await res.json();
  return data.posts;
}

type Post = {
  id: number;
  title: string;
};

// export async function generateStaticParams() {
//   const res = await fetch("https://dummyjson.com/posts");
//   const data = await res.json();

//   return data.posts.map((post: { id: number }) => ({
//     params: { id: post.id.toString() },
//   }));
// }

async function getTags() {
  const res = await fetch("https://dummyjson.com/posts/tag-list");
  const data = await res.json();
  return data;
}

export type Params = Promise<{ tag: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Params;
}) {
  // const [posts, setPosts] = useState<Post[]>([]);
  // // const [search, setSearch] = useState("");
  // const [tagList, setTagList] = useState<string[]>([]);
  // const [selectedTag, setSelectedTag] = useState("");

  // useEffect(() => {
  //   setPosts([]);
  //   const delay = setTimeout(() => {
  //     getPosts(selectedTag).then(setPosts);
  //     getTags().then(setTagList);
  //   }, 300);

  //   return () => clearTimeout(delay);
  // }, [selectedTag]);

  const resolvedParams: { tag?: string } = await (searchParams ??
    Promise.resolve({}));

  const tag = resolvedParams.tag || "";

  const [posts, tags] = await Promise.all([getPosts(tag), getTags()]);

  return (
    <main>
      <div className="wrapper">
        <h1>My Blog</h1>
        <div className="filter-wrapper">
          <TagFilter tags={tags} />
          {/* <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        /> */}

          {/* <select
            onChange={(e) => setSelectedTag(e.target.value)}
            value={selectedTag}
          >
            <option value="">All Tags</option>
            {tagList.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select> */}
        </div>
        <ul>
          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </main>
  );
}
