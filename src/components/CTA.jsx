import React from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import ctaBg from "../assets/cta_bg.png";

const CTA = ({ data }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="Logistics Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dorabel-purple/75 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-8 block">
              Get In Touch
            </span>

            {data ? (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]"
              >
                {data.heading}
              </h2>
            ) : (
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-[1.1]">
                Ready to Streamline Your <br />
                <span className="italic text-dorabel-gold">
                  Logistics Operations?
                </span>
              </h2>
            )}

            {data ? (
              <p
                data-tina-field={tinaField(data, "subheading")}
                className="text-xl text-gray-200 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
              >
                {data.subheading}
              </p>
            ) : (
              <p className="text-xl text-gray-200 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Join the growing number of businesses who trust Dorabel
                Logistics to keep their supply chain moving.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#contact"
                data-tina-field={tinaField(data, "buttonText")}
                className="px-12 py-5 bg-dorabel-gold hover:bg-white hover:text-dorabel-purple text-dorabel-purple font-bold rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl text-sm tracking-widest uppercase"
              >
                {data.buttonText || "Get a Free Quote"}
              </a>
              <a
                href="tel:+447949937023"
                data-tina-field={tinaField(data, "secondaryButtonText")}
                className="px-12 py-5 bg-transparent border border-white/30 hover:border-white hover:bg-white text-white hover:text-dorabel-purple font-bold rounded-xl transition-all duration-500 text-sm tracking-widest uppercase backdrop-blur-sm"
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
