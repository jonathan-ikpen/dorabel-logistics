import React from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

const Testimonials = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-24 bg-dorabel-gray-light">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24">
          <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-4 block">
            Testimonials
          </span>
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple"
          >
            {data.heading || "Trusted by Industry Leaders"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(data.items || []).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="bg-white p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-8 text-dorabel-gold opacity-60 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p
                data-tina-field={tinaField(t, "text")}
                className="text-dorabel-gray-dim text-lg italic mb-8 font-light leading-relaxed"
              >
                "{t.text}"
              </p>
              <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                <div className="w-12 h-12 bg-dorabel-purple text-white flex items-center justify-center font-heading font-bold text-xl shadow-md cursor-default">
                  {(t.name || "A")[0]}
                </div>
                <div>
                  <h4
                    data-tina-field={tinaField(t, "name")}
                    className="font-heading font-bold text-dorabel-purple text-lg tracking-wide"
                  >
                    {t.name}
                  </h4>
                  <p
                    data-tina-field={tinaField(t, "role")}
                    className="text-xs text-dorabel-gold font-bold uppercase tracking-wider"
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
