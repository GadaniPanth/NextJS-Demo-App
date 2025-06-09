// app/blog/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  body: string;
}

// async function getPost(id: any) {
//   const res = await fetch(`https://dummyjson.com/posts/${id}`);
//   if (!res.ok) throw new Error("Post not found");
//   return res.json();
// }

export default function PostPage() {
  const { id } = useParams();
  // const post = await getPost(id);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then(setPost)
      .catch(console.error);
  }, [id]);

  return (
    <div className="wrapper">
      <article>
        <h1>{post && post.title}</h1>
        <p>{post && post.body}</p>
        <Link href="/">Back to home</Link>
      </article>
    </div>
  );
}
