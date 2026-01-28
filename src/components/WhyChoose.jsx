import React from "react";
import { FadeIn } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const iconMap = {
  Reliability: (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Transparency: (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  "Cost-Effective": (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Compliance: (
    <svg
      className="w-6 h-6"
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
  ),
};

const WhyChoose = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-12 md:py-24 bg-dorabel-gray-light">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24">
          <FadeIn>
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="text-3xl md:text-5xl font-heading font-bold text-dorabel-purple mb-6"
            >
              {data.heading || "Why Partner With Dorabel?"}
            </h2>
            <p
              data-tina-field={tinaField(data, "subheading")}
              className="text-dorabel-gray-dim max-w-2xl mx-auto text-lg leading-relaxed font-light"
            >
              {data.subheading ||
                "We bring a new level of professionalism and reliability to the facility management industry."}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(data.benefits || []).map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-8 group h-full hover:shadow-lg transition-shadow duration-500 border border-gray-100">
                <div className="w-12 h-12 bg-transparent border border-dorabel-gold/30 flex items-center justify-center text-dorabel-purple mb-8 group-hover:bg-dorabel-gold group-hover:text-white group-hover:border-dorabel-gold transition-all duration-500 rounded-xl">
                  {iconMap[benefit.title] || (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <h3
                  data-tina-field={tinaField(benefit, "title")}
                  className="text-xl font-heading font-bold text-dorabel-purple mb-4"
                >
                  {benefit.title}
                </h3>
                <p
                  data-tina-field={tinaField(benefit, "description")}
                  className="text-dorabel-gray-dim text-base leading-relaxed font-sans"
                >
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
