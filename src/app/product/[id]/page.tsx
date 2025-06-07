"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./product.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  return (
    <div className={styles.products_wrapper}>
      {product ? (
        <>
          <div className={styles.products_image}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
            >
              {product.images.map((image: string, index: number) => (
                <SwiperSlide className={styles.swiper_slide} key={index}>
                  <div className={styles.image_container}>
                    <div className={styles.image_loader}></div>
                    <img
                      src={image}
                      alt={product.title}
                      className={styles.image_real}
                      onLoad={(e) =>
                        e.currentTarget.previousElementSibling?.remove()
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h2 className={styles.product_title}>{product.title}</h2>
          <p className={styles.product_description}>{product.description}</p>
          <p className={styles.product_price}>${product.price}</p>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <Link href="/products">Back to Products List</Link>
    </div>
  );
}
