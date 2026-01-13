import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      // Move dot immediately
      if (dot) {
        dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Move circle with delay/easing
      if (cursor) {
        cursor.animate(
          {
            transform: `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`,
          },
          {
            duration: 500,
            fill: "forwards",
          }
        );
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;
