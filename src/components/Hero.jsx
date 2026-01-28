import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/dorabel_hero.png";
import ParallaxImage from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-20 lg:pt-48 md:pt-32 pb-12 md:pb-24 flex items-center">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col lg:flex-row h-full items-center">
          {/* Left Content - Typography Focused */}
          <div className="flex-1 lg:w-[50%] lg:flex-none z-20 pt-16 lg:pt-0 lg:pr-12 self-center">
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
                  className="px-10 py-4 bg-dorabel-purple text-white font-semibold text-sm tracking-widest uppercase hover:bg-dorabel-gold transition-colors duration-300 text-center rounded-xl"
                >
                  {data.ctaText || "Get Started"}
                </a>
                <a
                  href={data.secondaryCtaLink || "#services"}
                  data-tina-field={tinaField(data, "secondaryCtaText")}
                  className="px-10 py-4 border border-dorabel-purple text-dorabel-purple font-semibold text-sm tracking-widest uppercase hover:bg-dorabel-purple hover:text-white transition-colors duration-300 text-center rounded-xl"
                >
                  {data.secondaryCtaText || "Our Services"}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Image - Full Height / Bleed effect on lg screens */}
          <div className="flex-1 relative w-full h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 lg:w-[50%]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full w-full relative"
            >
              <img
                src={data.backgroundImage || heroImage}
                alt="Logistics Transport"
                data-tina-field={tinaField(data, "backgroundImage")}
                className="w-full h-full object-cover object-center"
              />

              {/* Optional: Modern Glass Overlay Card (Simplified) */}
              <div className="absolute bottom-12 left-12 right-12 lg:left-[-4rem] lg:right-auto z-20 hidden md:block">
                <div className="bg-white/90 backdrop-blur-md p-8 border-l-4 border-dorabel-gold shadow-2xl max-w-sm rounded-2xl">
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
