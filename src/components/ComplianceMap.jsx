import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const ComplianceMap = ({ data }) => {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <Reveal>
              <span
                data-tina-field={data ? tinaField(data, "subheading") : null}
                className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-2 block"
              >
                {data?.subheading || "Compliance Tracking"}
              </span>
              <div className="h-[1px] w-12 bg-gray-200 mb-6"></div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                data-tina-field={data ? tinaField(data, "heading") : null}
                className="text-4xl md:text-5xl font-heading capitalize font-bold text-dorabel-purple mb-6 leading-tight"
              >
                {data?.heading || "Track Compliance Standards Nationwide"}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                data-tina-field={data ? tinaField(data, "description") : null}
                className="text-dorabel-gray-dim text-lg leading-relaxed font-light max-w-lg mb-8 space-y-6"
              >
                {data?.description ? (
                  data.description
                    .split(/\n+/)
                    .map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <>
                    <p>
                      Navigating the complexities of UK transport regulations is
                      essential for any business. We ensure that every journey
                      meets strict safety and compliance standards, giving you
                      full confidence that your goods are being transported
                      legally and responsibly.
                    </p>
                    <p>
                      From correct documentation to secure load handling, our
                      professional team manages the details so you don't have
                      to. We are dedicated to maintaining the highest levels of
                      operational integrity and care for every consignment we
                      carry.
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-2">
                <Link
                  to={data?.buttonLink || "/contact"}
                  data-tina-field={data ? tinaField(data, "buttonText") : null}
                  className="inline-flex justify-center items-center px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-xl text-white bg-dorabel-purple hover:bg-dorabel-gold transition-all duration-500 shadow-sm hover:px-12"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  {data?.buttonText || "Contact Support"}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Map Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <Reveal delay={0.2} className="w-full">
              <img
                src={data?.image || "/assets/uk_map-no-bg.png"}
                alt="UK Compliance Map"
                data-tina-field={data ? tinaField(data, "image") : null}
                className="w-full h-auto object-fill scale-[1.40] hover:scale-[1.45] transition-transform duration-700 ease-out origin-center lg:origin-center"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceMap;
