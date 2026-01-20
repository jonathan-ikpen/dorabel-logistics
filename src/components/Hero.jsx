import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/dorabel_hero.png";
import ParallaxImage from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-48 md:pt-32 pb-24 flex items-center">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col lg:flex-row h-full items-center">
          {/* Left Content - Typography Focused */}
          <div className="flex-1 lg:w-[55%] lg:flex-none z-20 pt-16 lg:pt-0 lg:pr-12 self-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-8 bg-dorabel-gold block"></span>
                <span
                  data-tina-field={tinaField(data, "badgeText")}
                  className="text-dorabel-purple text-xs md:text-sm font-bold uppercase tracking-[0.2em]"
                >
                  {data.badgeText || "Est. 2025"}
                </span>
              </div>
            </Reveal>

            <h1
              data-tina-field={tinaField(data, "heading")}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-8 leading-[1.05] text-dorabel-purple tracking-tight"
            >
              {data.heading}
            </h1>

            <Reveal delay={0.2}>
              <p
                data-tina-field={tinaField(data, "subheading")}
                className="text-lg md:text-xl text-dorabel-gray-dim mb-12 leading-relaxed font-light max-w-xl"
              >
                {data.subheading}
              </p>
            </Reveal>

            <Reveal delay={0.4} width="w-full">
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <a
                  href={data.ctaLink || "#contact"}
                  data-tina-field={tinaField(data, "ctaText")}
                  className="px-10 py-4 bg-dorabel-purple text-white font-semibold text-sm tracking-widest uppercase hover:bg-dorabel-gold transition-colors duration-300 text-center"
                >
                  {data.ctaText || "Get Started"}
                </a>
                <a
                  href={data.secondaryCtaLink || "#services"}
                  data-tina-field={tinaField(data, "secondaryCtaText")}
                  className="px-10 py-4 border border-dorabel-purple text-dorabel-purple font-semibold text-sm tracking-widest uppercase hover:bg-dorabel-purple hover:text-white transition-colors duration-300 text-center"
                >
                  {data.secondaryCtaText || "Our Services"}
                </a>
              </div>
            </Reveal>

            {/* Trust Indicators - Subtle & Clean */}
            <Reveal delay={0.6}>
              <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-400"
                    >
                      {/* Placeholder avatars if needed, or simple colored dots */}
                      <span className="font-bold">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-dorabel-gold text-white flex items-center justify-center text-xs font-bold">
                    50+
                  </div>
                </div>
                <p
                  data-tina-field={tinaField(data, "trustedText")}
                  className="text-sm text-dorabel-gray-dim font-bold max-w-[200px] text-center sm:text-left"
                >
                  {data.trustedText ||
                    "Trusted by commercial partners across the UK"}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Image - Full Height / Bleed effect on lg screens */}
          <div className="flex-1 relative w-full h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full w-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 lg:w-32"></div>
              <img
                src={data.backgroundImage || heroImage}
                alt="Logistics Transport"
                data-tina-field={tinaField(data, "backgroundImage")}
                className="w-full h-full object-cover object-center"
              />

              {/* Optional: Modern Glass Overlay Card (Simplified) */}
              <div className="absolute bottom-12 left-12 right-12 lg:left-[-4rem] lg:right-auto z-20 hidden md:block">
                <div className="bg-white/90 backdrop-blur-md p-8 border-l-4 border-dorabel-gold shadow-2xl max-w-sm">
                  <p className="text-4xl font-heading font-bold text-dorabel-purple mb-2">
                    99.8%
                  </p>
                  <p className="text-sm font-bold uppercase tracking-wider text-dorabel-gray-dim">
                    On-Time Delivery Rate
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
