import Link from "next/link";

async function getPost(id: string) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function PostPage({ params }: any) {
  const postId = params.id;
  const post = await getPost(postId);

  return (
    <>
      <div className="wrapper">
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Link href="/">Back to home</Link>
        </article>
      </div>
    </>
  );
}
