import React from "react";
import { Link } from "react-router-dom";
import { Reveal, FadeIn, MaskReveal } from "./Reveal";
import aboutImage from "../assets/dorabel_hero.png";
import ParallaxImage from "./ParallaxImage";

import { tinaField } from "tinacms/dist/react";

const About = ({ data }) => {
  // If data is provided, use it. Otherwise, use default (or return null but we might want fallback for partial migration)
  // For this demo, we assume data is passed if migrated.

  return (
    <section id="about" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Image Side */}
          <div className="lg:w-1/2 order-2 lg:order-1 relative h-[600px] w-full">
            <MaskReveal className="w-full h-full shadow-2xl">
              <ParallaxImage
                src={data.image || aboutImage}
                alt="Dorabel Team"
                data-tina-field={tinaField(data, "image")}
                className="w-full h-full"
              />
            </MaskReveal>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <Reveal>
              <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs">
                About Dorabel
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              {data ? (
                <h2
                  data-tina-field={tinaField(data, "heading")}
                  className="text-5xl md:text-6xl font-heading font-bold text-dorabel-purple mt-6 mb-8 leading-tight"
                >
                  {data.heading}
                </h2>
              ) : (
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-dorabel-purple mt-6 mb-8 leading-tight">
                  More Than Just <br />
                  Logistics
                </h2>
              )}
            </Reveal>

            <Reveal delay={0.3}>
              {data ? (
                <p
                  data-tina-field={tinaField(data, "content")}
                  className="text-dorabel-gray-dim text-xl leading-relaxed mb-6 font-light"
                >
                  {data.content}
                </p>
              ) : (
                <>
                  <p className="text-dorabel-gray-dim text-xl leading-relaxed mb-6 font-light">
                    Founded on the principles of transparency and efficiency,
                    Dorabel was created to bridge the gap between property
                    owners and reliable service providers. We understand the
                    headaches of property management—missed appointments,
                    unclear costs, and sub-par work.
                  </p>
                  <p className="text-dorabel-gray-dim text-lg leading-relaxed mb-8">
                    Our "Dorabel Standard" ensures that every contractor we
                    deploy is vetted, insured, and monitored. We don't just fix
                    problems; we implement systems to prevent them, saving you
                    time, money, and stress in the long run.
                  </p>
                </>
              )}

              <div className="mb-12">
                <Link
                  to="/about"
                  className="inline-flex items-center text-dorabel-purple font-bold tracking-widest uppercase text-sm hover:text-dorabel-gold transition-colors duration-300 group"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4} width="100%">
              <div className="flex flex-row items-center justify-between mt-0 pt-12 gap-8">
                <div className="flex gap-12 w-full md:w-auto">
                  <div>
                    <h4
                      data-tina-field={
                        data ? tinaField(data, "stat1Number") : ""
                      }
                      className="text-5xl font-heading font-bold text-dorabel-purple mb-2"
                    >
                      {data?.stat1Number || "10+"}
                    </h4>
                    <p
                      data-tina-field={
                        data ? tinaField(data, "stat1Label") : ""
                      }
                      className="text-sm text-dorabel-gray-dim uppercase tracking-widest"
                    >
                      {data?.stat1Label || "Years Experience"}
                    </p>
                  </div>
                  <div>
                    <h4
                      data-tina-field={
                        data ? tinaField(data, "stat2Number") : ""
                      }
                      className="text-5xl font-heading font-bold text-dorabel-purple mb-2"
                    >
                      {data?.stat2Number || "98%"}
                    </h4>
                    <p
                      data-tina-field={
                        data ? tinaField(data, "stat2Label") : ""
                      }
                      className="text-sm text-dorabel-gray-dim uppercase tracking-widest"
                    >
                      {data?.stat2Label || "Client Retention"}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
