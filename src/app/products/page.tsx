// "use client";

// import Link from "next/link";
// import styles from "./products.module.css";
// import { useEffect, useState } from "react";

// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   images: string[];
// };

// export default function Products() {
//   const [loadingText, setLoadingText] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchProduct, setSearchProduct] = useState("");
//   const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>(
//     {}
//   );

//   async function getProducts(str: string) {
//     setLoadingText("Loading...");
//     const res = await fetch(
//       str && searchProduct
//         ? `https://dummyjson.com/products/search?q=${str}&limit=20`
//         : str && selectedCategory
//         ? `https://dummyjson.com/products/category/${str}?limit=20`
//         : "https://dummyjson.com/products?limit=20"
//     );
//     const data = await res.json();
//     return data.products;
//   }

//   async function getCategoryList() {
//     setLoadingText("Loading...");
//     const res = await fetch("https://dummyjson.com/products/category-list");
//     const data = await res.json();
//     return data;
//   }

//   useEffect(() => {
//     setProducts([]);
//     setImageLoaded({});
//     // setSearchProduct("");
//     const delay = setTimeout(() => {
//       getProducts(selectedCategory).then(setProducts);
//       getCategoryList().then(setCategoryList);
//     }, 200);

//     return () => clearTimeout(delay);
//   }, [selectedCategory]);

//   useEffect(() => {
//     setProducts([]);
//     setImageLoaded({});
//     // setSelectedCategory("");
//     const delay = setTimeout(() => {
//       getProducts(searchProduct).then(setProducts);
//       getCategoryList().then(setCategoryList);
//     }, 200);

//     return () => clearTimeout(delay);
//   }, [searchProduct]);

//   return (
//     <div className={styles.products_wrapper}>
//       <div className="filter-wrapper">
//         <h2>Products</h2>
//         <input
//           type="text"
//           placeholder="Search"
//           onChange={(e) => setSearchProduct(e.target.value)}
//           value={searchProduct}
//         />

//         <select
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           value={selectedCategory}
//         >
//           <option value="">All Categorys</option>
//           {categoryList.length > 0 &&
//             categoryList.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//         </select>
//       </div>
//       <ul className={styles.products_grid}>
//         {products.length > 0 ? (
//           products.map((product, index) => (
//             <div key={index} className={styles.shadow_wrapper}>
//               <Link
//                 href={`/product/${product.id}`}
//                 className={styles.product_card}
//               >
//                 <div className={styles.card_image}>
//                   {!imageLoaded[product.id] && (
//                     <div className={styles.image_loader}></div>
//                   )}
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     style={{
//                       display: imageLoaded[product.id] ? "block" : "none",
//                     }}
//                     onLoad={() =>
//                       setImageLoaded((prev) => ({
//                         ...prev,
//                         [product.id]: true,
//                       }))
//                     }
//                   />
//                 </div>
//                 <div className={styles.card_text}>
//                   <div className={styles.card_head}>
//                     <h1 className={styles.title}>{product.title}</h1>
//                   </div>
//                   <div className={styles.card_body}>
//                     <h3 className={styles.product_price}>${product.price}</h3>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <h1>{loadingText}</h1>
//         )}
//       </ul>
//     </div>
//   );
// }

import Link from "next/link";
import styles from "./products.module.css";
import ProductFilter from "./ProductFilter";
import { Suspense } from "react";
import ImageLoaderWrapper from "./ImageLoaderWrapper";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

async function getProducts(
  category: string,
  search: string
): Promise<Product[]> {
  let url = "https://dummyjson.com/products?limit=20";
  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}&limit=20`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=20`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data.products || [];
}

async function getCategories(): Promise<string[]> {
  const res = await fetch("https://dummyjson.com/products/category-list", {
    cache: "force-cache",
  });
  return res.json();
}

export type Params = Promise<{ category: string; search: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Params;
}) {
  const resolvedParams: { category?: string; search?: string } =
    await (searchParams ?? Promise.resolve({}));

  const category = resolvedParams.category || "";
  const search = resolvedParams.search || "";

  const [products, categories] = await Promise.all([
    getProducts(category, search),
    getCategories(),
  ]);

  return (
    <div className={styles.products_wrapper}>
      <ProductFilter categories={categories} />

      <ul className={styles.products_grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.shadow_wrapper}>
              <Link
                href={`/product/${product.id}`}
                className={styles.product_card}
              >
                <div className={styles.card_image}>
                  <Suspense fallback={<div className={styles.image_loader} />}>
                    <ImageLoaderWrapper
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </Suspense>
                </div>
                <div className={styles.card_text}>
                  <div className={styles.card_head}>
                    <h1 className={styles.title}>{product.title}</h1>
                  </div>
                  <div className={styles.card_body}>
                    <h3 className={styles.product_price}>${product.price}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1>No products found.</h1>
        )}
      </ul>
    </div>
  );
}
