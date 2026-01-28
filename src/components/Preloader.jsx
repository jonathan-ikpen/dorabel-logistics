import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "../store/loading";

const Preloader = () => {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const isPageLoaded = useLoadingStore((state) => state.isPageLoaded);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Total animation time is roughly 3.5s
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && isPageLoaded) {
      setShouldHide(true);
    }
  }, [minTimeElapsed, isPageLoaded]);

  // SVG Paths from logo-white-no-text.svg
  // The 'Wings' complex path
  const wingsPath =
    "M253.44 159.03l-144.52 -2.79 4.99 -9.35 139.53 -2.89c4.13,-0.08 7.52,3.38 7.52,7.52l0 0c0,4.13 -3.38,7.6 -7.52,7.52zm0 -86.81l-144.52 2.79 4.99 9.35 139.53 2.89c4.13,0.08 7.52,-3.38 7.52,-7.52l0 0c0,-4.13 -3.38,-7.6 -7.52,-7.52zm-10.63 -24.94l-147.02 3.15 4.59 8.61 142.42 3.27c4.13,0.1 7.52,-3.38 7.52,-7.52l0 0c0,-4.13 -3.39,-7.61 -7.52,-7.52zm14.08 47.28l-136.23 2.44 5.38 10.08 130.85 2.51c4.13,0.08 7.52,-3.38 7.52,-7.52l0 -0c0,-4.13 -3.39,-7.59 -7.52,-7.52zm-32.48 -69.74l-140.44 3.47 4.24 7.95 136.2 3.61c4.13,0.11 7.52,-3.38 7.52,-7.52l0 -0c0,-4.13 -3.39,-7.62 -7.52,-7.52zm18.4 159.16l-147.02 -3.15 4.59 -8.61 142.42 -3.28c4.13,-0.09 7.52,3.38 7.52,7.52l0 0c0,4.13 -3.39,7.61 -7.52,7.52zm14.08 -47.28l-136.23 -2.44 5.38 -10.08 130.85 -2.51c4.13,-0.08 7.52,3.38 7.52,7.52l0 0c0,4.13 -3.39,7.59 -7.52,7.52zm-32.48 69.74l-140.44 -3.47 4.24 -7.95 136.2 -3.61c4.13,-0.11 7.52,3.38 7.52,7.52l0 0c0,4.13 -3.39,7.62 -7.52,7.52zm-25.38 24.81l-128.05 -3.94 3.73 -6.99 124.32 -4.1c4.13,-0.14 7.52,3.38 7.52,7.52l0 0c0,4.13 -3.39,7.64 -7.52,7.52zm0 -231.25l-128.05 3.94 3.73 6.99 124.32 4.1c4.13,0.14 7.52,-3.38 7.52,-7.52l0 -0c0,-4.13 -3.39,-7.64 -7.52,-7.52z";

  // The 'Arrow' polygon converted to path
  const arrowPath =
    "M0,0 L52.89,0 L114.62,115.63 L52.89,231.25 L0,231.25 L61.73,115.63 Z";

  const drawTransition = {
    duration: 2,
    ease: "easeInOut",
  };

  const fillTransition = {
    duration: 0.8,
    ease: "easeOut",
    delay: 1.5,
  };

  return (
    <AnimatePresence mode="wait">
      {!shouldHide && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dorabel-purple"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo Container */}
          <div className="relative w-16 h-16 md:w-16 md:h-16 mb-8">
            <svg
              viewBox="0 0 264.4 231.25"
              className="w-full h-full overflow-visible"
            >
              {/* Wings */}
              <motion.path
                d={wingsPath}
                fill="currentColor"
                initial={{
                  pathLength: 0,
                  fill: "rgba(255, 255, 255, 0)",
                  stroke: "rgba(217, 119, 6, 1)", // #d97706
                  strokeWidth: 1,
                }}
                animate={{
                  pathLength: 1,
                  fill: "rgba(255, 255, 255, 1)",
                  stroke: "rgba(217, 119, 6, 0)",
                }}
                transition={{
                  pathLength: drawTransition,
                  fill: fillTransition,
                  stroke: fillTransition,
                }}
              />
              {/* Arrow */}
              <motion.path
                d={arrowPath}
                fill="currentColor"
                initial={{
                  pathLength: 0,
                  fill: "rgba(255, 255, 255, 0)",
                  stroke: "rgba(217, 119, 6, 1)", // #d97706
                  strokeWidth: 1,
                }}
                animate={{
                  pathLength: 1,
                  fill: "rgba(255, 255, 255, 1)",
                  stroke: "rgba(217, 119, 6, 0)",
                }}
                transition={{
                  pathLength: { ...drawTransition, delay: 0.2 }, // slight delay for arrow
                  fill: fillTransition,
                  stroke: fillTransition,
                }}
              />
            </svg>
          </div>

          {/* Text Container */}
          <div className="text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.0,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-2">
                Dorabel
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.8 }}
            >
              <p className="text-dorabel-gold font-sans text-xs tracking-[0.3em] uppercase">
                International Limited
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
