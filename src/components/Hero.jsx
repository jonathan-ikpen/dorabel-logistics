import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/dorabel_hero.png";
import ParallaxImage from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-48 md:pt-32 pb-24">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Text Content */}
          <div className="flex-1 lg:pr-12 z-10">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-[1px] w-12 bg-dorabel-gold block"></span>
                <span
                  data-tina-field={tinaField(data, "badgeText")}
                  className="text-dorabel-purple text-sm font-medium uppercase tracking-widest"
                >
                  {data.badgeText || "Est. 2025"}
                </span>
              </div>
            </Reveal>

            <h1
              data-tina-field={tinaField(data, "heading")}
              className="text-6xl md:text-8xl font-heading font-medium mb-8 leading-[1.1] text-dorabel-purple"
            >
              {data.heading}
            </h1>

            <Reveal delay={0.3}>
              <p
                data-tina-field={tinaField(data, "subheading")}
                className="text-xl md:text-2xl text-dorabel-gray-dim mb-16 leading-relaxed font-light max-w-lg"
              >
                {data.subheading}
              </p>
            </Reveal>

            <Reveal delay={0.4} width="w-full md:fit-content">
              <div className="flex flex-col sm:flex-row gap-8 mb-16">
                <a
                  href={data.ctaLink || "#contact"}
                  data-tina-field={tinaField(data, "ctaText")}
                  className="px-12 py-5 text-center bg-dorabel-purple text-white font-medium rounded-none transition-all hover:bg-dorabel-gold duration-500 shadow-sm text-sm tracking-widest uppercase hover:px-14"
                >
                  {data.ctaText || "Get Started"}
                </a>
                <a
                  href={data.secondaryCtaLink || "#services"}
                  data-tina-field={tinaField(data, "secondaryCtaText")}
                  className="px-12 py-5 text-center text-dorabel-purple font-medium rounded-none transition-all border border-gray-200 hover:border-dorabel-purple hover:bg-gray-50 text-sm tracking-widest uppercase"
                >
                  {data.secondaryCtaText || "Our Services"}
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm font-medium text-dorabel-gray-dim border-t border-gray-100 pt-8">
                <p data-tina-field={tinaField(data, "trustedText")}>
                  {data.trustedText || "Trusted by 50+ Leading Agencies"}
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-dorabel-gray-dim"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full h-[600px] lg:h-[800px]">
            <div className="absolute inset-0 z-0">
              <ParallaxImage
                src={data.backgroundImage || heroImage}
                alt="Modern Commercial Building"
                data-tina-field={tinaField(data, "backgroundImage")}
                className="w-full h-full object-cover rounded-none grayscale-[20%]contrast-110" // Sharp corners, slight elegant styling
              />
            </div>

            {/* Floating Card - Matured Styling */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 -left-12 bg-white p-10 shadow-xl border-t-4 border-dorabel-gold hidden md:block z-10 max-w-sm" // Sharp square card, gold accent top
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="text-4xl text-dorabel-gold font-heading font-bold">
                  100%
                </div>
                <div className="h-10 w-[1px] bg-gray-200"></div>
                <div>
                  <p className="font-heading font-bold text-dorabel-purple text-lg tracking-wide uppercase">
                    SUCCESS RATE
                  </p>
                </div>
              </div>
              <p
                data-tina-field={tinaField(data, "cardDescription")}
                className="text-dorabel-gray-dim leading-relaxed font-light"
              >
                {data.cardDescription ||
                  "Setting the benchmark for quality and compliance in facility management."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
