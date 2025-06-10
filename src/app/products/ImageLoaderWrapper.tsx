"use client";

import { useState } from "react";

export default function ImageLoaderWrapper({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="image-loader" />}
      <img
        src={src}
        alt={alt}
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
