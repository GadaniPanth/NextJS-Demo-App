import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Metadata } from "next";

export default function about() {
  return (<>

    <h1>About</h1>
    <br />
    <Link href="/">Home</Link>
    <br />
    <Link href="/blog/1">Blog-1</Link>
  </>);
}
