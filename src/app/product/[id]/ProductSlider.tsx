"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./product.module.css";

export default function ProductSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <div className={styles.products_image}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
      >
        {images.map((image, index) => (
          <SwiperSlide className={styles.swiper_slide} key={index}>
            <div className={styles.image_container}>
              <div className={styles.image_loader}></div>
              <img
                src={image}
                alt={title}
                className={styles.image_real}
                onLoad={(e) => e.currentTarget.previousElementSibling?.remove()}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
