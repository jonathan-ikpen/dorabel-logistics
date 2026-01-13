import React from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

const CTA = ({ data }) => {
  return (
    <section className="py-32 bg-slate-50 border-t border-gray-100 relative overflow-hidden">
      {/* Background Decoration - Very Subtle */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dorabel-purple/3 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-dorabel-gold font-medium uppercase tracking-widest text-xs mb-8 block">
              Get In Touch
            </span>

            {data ? (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="text-4xl md:text-6xl font-heading font-medium text-dorabel-purple mb-8 leading-[1.1]"
              >
                {data.heading}
              </h2>
            ) : (
              <h2 className="text-4xl md:text-6xl font-heading font-medium text-dorabel-purple mb-8 leading-[1.1]">
                Ready to Streamline Your <br />
                <span className="italic text-dorabel-gold/80">
                  Logistics Operations?
                </span>
              </h2>
            )}

            {data ? (
              <p
                data-tina-field={tinaField(data, "subheading")}
                className="text-xl text-dorabel-gray-dim mb-16 max-w-2xl mx-auto font-light leading-relaxed"
              >
                {data.subheading}
              </p>
            ) : (
              <p className="text-xl text-dorabel-gray-dim mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Join the growing number of businesses who trust Dorabel
                International to keep their supply chain moving.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#contact"
                data-tina-field={tinaField(data, "buttonText")}
                className="px-12 py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-medium rounded-none transition-all duration-500 shadow-sm text-sm tracking-widest uppercase"
              >
                {data.buttonText || "Get a Free Quote"}
              </a>
              <a
                href="tel:07949937023"
                data-tina-field={tinaField(data, "secondaryButtonText")}
                className="px-12 py-5 bg-transparent border border-gray-200 hover:border-dorabel-purple hover:bg-white text-dorabel-purple font-medium rounded-none transition-all duration-500 text-sm tracking-widest uppercase"
              >
                {data.secondaryButtonText || "Call Us Now"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
