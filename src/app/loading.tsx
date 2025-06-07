import styles from "./page.module.css";

export default function Loading() {
  return <div className="wrapper"><p className={styles.loading}>Loading...</p></div>; // Replace with spinner or skeleton
}
