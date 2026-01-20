import React from "react";
import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-dorabel-purple relative overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-dorabel-gold font-bold tracking-widest uppercase text-xs mb-4 block">
              Why Choose Us
            </span>
            <div className="h-[1px] w-12 bg-dorabel-gold mb-8 opacity-30"></div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
              The Bridge Between <br />
              <span className="text-dorabel-gray-dim italic">
                Needs & Execution
              </span>
            </h2>
            <p className="text-dorabel-gray-dim text-lg mb-12 leading-relaxed font-light">
              We understand the complexities of property management. Our mission
              is to simplify the process for landlords and agents by providing a
              single, reliable point of contact for all facility needs.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-10">
              <div>
                <h3 className="text-4xl font-heading font-bold text-white mb-2">
                  100%
                </h3>
                <p className="text-sm text-dorabel-gray-dim tracking-wide uppercase">
                  Compliance & Safety
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-heading font-bold text-white mb-2">
                  24/7
                </h3>
                <p className="text-sm text-dorabel-gray-dim tracking-wide uppercase">
                  Support Availability
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-heading font-bold text-white mb-2">
                  50+
                </h3>
                <p className="text-sm text-dorabel-gray-dim tracking-wide uppercase">
                  Trusted Partners
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-heading font-bold text-white mb-2">
                  Eco
                </h3>
                <p className="text-sm text-dorabel-gray-dim tracking-wide uppercase">
                  Friendly Solutions
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-dorabel-gold/5 transform translate-x-4 translate-y-4 border border-dorabel-gold/20"></div>
            <div className="relative bg-[#341275] border border-white/5 p-10 shadow-2xl">
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-dorabel-gold transition-colors duration-500">
                    <svg
                      className="w-5 h-5 text-dorabel-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-xl mb-2">
                      Trustworthy & Dependable
                    </h4>
                    <p className="text-dorabel-gray-dim text-sm font-light leading-relaxed">
                      Vetted professionals and transparent communication at
                      every step.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-dorabel-gold transition-colors duration-500">
                    <svg
                      className="w-5 h-5 text-dorabel-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-xl mb-2">
                      Efficient Coordination
                    </h4>
                    <p className="text-dorabel-gray-dim text-sm font-light leading-relaxed">
                      Streamlined workflows that save you time and reduce
                      operational headaches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-dorabel-gold transition-colors duration-500">
                    <svg
                      className="w-5 h-5 text-dorabel-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-xl mb-2">
                      Environmentally Aware
                    </h4>
                    <p className="text-dorabel-gray-dim text-sm font-light leading-relaxed">
                      Sustainable practices that respect our planet while
                      delivering results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
