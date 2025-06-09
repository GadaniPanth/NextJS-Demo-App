import Link from "next/link";
import styles from "./page.module.css";

export default async function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <Link href={"/"}>Blog</Link>
        <Link href={"/products"}>Products</Link>
      </div>
    </>
  );
}
