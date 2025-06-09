import Link from "next/link";
import styles from "./product.module.css";
import ProductSlider from "./ProductSlider"; // ✅ regular import

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export type Params = Promise<{ id: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Product not found");

  const product: Product = await res.json();

  return (
    <div className={styles.products_wrapper}>
      <ProductSlider images={product.images} title={product.title} />
      <h2 className={styles.product_title}>{product.title}</h2>
      <p className={styles.product_description}>{product.description}</p>
      <p className={styles.product_price}>${product.price}</p>
      <Link href="/products">Back to Products List</Link>
    </div>
  );
}
