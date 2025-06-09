// app/blog/[id]/page.tsx

import Link from "next/link";

async function getPost(id: string) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.id);

  return (
    <div className="wrapper">
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <Link href="/">Back to home</Link>
      </article>
    </div>
  );
}
