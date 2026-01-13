import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "../store/loading";

const Preloader = () => {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const isPageLoaded = useLoadingStore((state) => state.isPageLoaded);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && isPageLoaded) {
      setShouldHide(true);
    }
  }, [minTimeElapsed, isPageLoaded]);

  return (
    <AnimatePresence mode="wait">
      {!shouldHide && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dorabel-purple"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tighter overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="block"
              >
                Dorabel
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-dorabel-gold font-sans tracking-widest uppercase text-sm mt-4"
            >
              Logistics Services
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
