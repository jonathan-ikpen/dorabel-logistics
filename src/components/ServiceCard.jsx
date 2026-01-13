import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true }}
      className="group relative p-10 bg-[#341275] border border-white/5 hover:border-dorabel-gold/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-dorabel-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 mb-8 bg-white/10 border border-white/10 flex items-center justify-center text-dorabel-gold group-hover:border-dorabel-gold transition-colors duration-500">
          {service.icon}
        </div>

        <h3 className="text-2xl font-heading font-medium text-white mb-6 group-hover:text-dorabel-gold transition-colors duration-300">
          {service.title}
        </h3>

        <ul className="space-y-4">
          {service.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 text-dorabel-gray-dim text-sm"
            >
              <div className="mt-1.5 w-1 h-1 bg-dorabel-gold flex-shrink-0" />
              <span className="leading-relaxed font-light text-gray-300">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
