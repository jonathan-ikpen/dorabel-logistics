import React from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

const Process = ({ data }) => {
  if (!data) return null;

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-20 items-stretch">
          <div className="md:w-1/3 flex flex-col justify-center">
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-4 block">
              How We Work
            </span>
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mt-3 mb-8 leading-tight"
            >
              {data.heading || "A Streamlined Approach to Facility Management"}
            </h2>
            <p
              data-tina-field={tinaField(data, "description")}
              className="text-dorabel-gray-dim text-lg leading-relaxed mb-12 font-light"
            >
              {data.description ||
                "We've refined our process to be as efficient and transparent as possible."}
            </p>
            <div className="mt-auto">
              <a
                href="#contact"
                className="px-12 py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-bold rounded-none transition-all duration-500 shadow-sm text-sm tracking-widest uppercase inline-block"
              >
                {data.ctaText || "Start Your Consultation"}
              </a>
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
            {(data.steps || []).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="bg-white p-12 hover:bg-gray-50 transition-colors duration-500 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span
                    data-tina-field={tinaField(step, "number")}
                    className="text-5xl font-heading font-light text-dorabel-purple/10 group-hover:text-dorabel-gold/20 transition-colors duration-500"
                  >
                    {step.number}
                  </span>
                  <div className="w-8 h-[1px] bg-dorabel-purple/20 group-hover:bg-dorabel-gold transition-colors duration-500 mt-4"></div>
                </div>

                <h3
                  data-tina-field={tinaField(step, "title")}
                  className="text-2xl font-heading font-bold text-dorabel-purple mb-4 group-hover:text-dorabel-gold transition-colors duration-300"
                >
                  {step.title}
                </h3>
                <p
                  data-tina-field={tinaField(step, "description")}
                  className="text-dorabel-gray-dim text-sm leading-relaxed font-light"
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
