// import Link from "next/link";

// async function getPost(id: string) {
//   const res = await fetch(`https://dummyjson.com/posts/${id}`);
//   if (!res.ok) {
//     throw new Error("Post not found");
//   }
//   return res.json();
// }

// async function getAllPostIds() {
//   const res = await fetch("https://dummyjson.com/posts");
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   const data = await res.json();
//   return data.posts.map((post: { id: number }) => post.id.toString());
// }

// export async function generateStaticParams() {
//   const ids = await getAllPostIds();

//   return ids.map((id) => ({
//     id,
//   }));
// }

// export default async function PostPage({ params }: { params: { id: string } }) {
//   const post = await getPost(params.id);

//   return (
//     <div className="wrapper">
//       <article>
//         <h1>{post.title}</h1>
//         <p>{post.body}</p>
//         <Link href="/">Back to home</Link>
//       </article>
//     </div>
//   );
// }

export default async function PostPage() {
  return (
    <div className="wrapper">
      <article>,mpadpawdlapwpjd</article>
    </div>
  );
}
