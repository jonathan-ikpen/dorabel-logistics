import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxImage = ({ src, alt, className, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} {...props}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
