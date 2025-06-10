import Link from "next/link";

interface Post {
  id: string;
  title: string;
  body: string;
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();

  return data.posts.map((post: { id: number }) => ({
    id: post.id.toString(),
  }));
}

export type Params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { id } = await params;
  // console.log(id);

  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");

  const post: Post = await res.json();

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
