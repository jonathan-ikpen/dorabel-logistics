import React from "react";

export default function LazyImage({ src, alt = "", className = "", style = {}, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      {...props}
    />
  );
}
