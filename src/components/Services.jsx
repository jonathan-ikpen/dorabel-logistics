import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import maintenanceImg from "../assets/service_van_branded.png";
import cleaningImg from "../assets/service_warehouse.png";
import inspectionImg from "../assets/service_ship.png";
import { Reveal, MaskReveal } from "./Reveal";
import heroBuildingImg from "../assets/dorabel_hero.png";
import { tinaField } from "tinacms/dist/react";

const localServices = [
  {
    id: 1,
    title: "Procurement & Coordination",
    description: "We manage your entire supply chain with precision and care.",
    features: ["Global Sourcing", "Contract Negotiation", "Vendor Management"],
    image: inspectionImg, // Ship
    icon: "01",
  },
  {
    id: 2,
    title: "Logistics Management",
    description: "End-to-end logistics solutions for your business needs.",
    features: ["Fleet Management", "Route Optimization", "Last Mile Delivery"],
    image: maintenanceImg, // Van
    icon: "02",
  },
  {
    id: 3,
    title: "Warehousing Services",
    description: "Secure and efficient storage for your inventory.",
    features: ["Inventory Control", "Distribution", "Storage Solutions"],
    image: cleaningImg, // Warehouse
    icon: "03",
  },
];

const Services = ({ previewMode = false, data }) => {
  // Use data.items if available, otherwise fall back to local or empty array
  const items = data?.items || [];
  const displayedServices = previewMode ? items.slice(0, 3) : items;

  return (
    <section id="services" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="md:w-1/2 mb-16">
          <Reveal>
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-2 block">
              Our Expertise
            </span>
            <div className="h-[1px] w-12 bg-gray-200 mb-6"></div>
            <h2
              data-tina-field={data ? tinaField(data, "heading") : null}
              className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mb-6 leading-tight"
            >
              {data?.heading || "Comprehensive Solutions"}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              data-tina-field={data ? tinaField(data, "subheading") : null}
              className="text-dorabel-gray-dim text-lg leading-relaxed font-light"
            >
              {data?.subheading ||
                "We offer a full suite of services designed to take the stress out of property management."}
            </p>
          </Reveal>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 ${
            previewMode ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {displayedServices.map((service, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className="h-full"
              width="100%"
            >
              <div className="group h-full bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 flex flex-col rounded-2xl">
                <div className="relative h-64 overflow-hidden">
                  <MaskReveal className="h-full w-full rounded-t-2xl">
                    <img
                      src={service.image || heroBuildingImg}
                      alt={service.title}
                      data-tina-field={tinaField(service, "image")}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 p-5 bg-white z-10 border-b border-l border-gray-100">
                      <span className="font-heading font-bold text-2xl text-dorabel-purple">
                        {service.icon || `0${index + 1}`}
                      </span>
                    </div>
                  </MaskReveal>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3
                    data-tina-field={tinaField(service, "title")}
                    className="text-2xl font-heading font-bold text-dorabel-purple mb-4 group-hover:text-dorabel-gold transition-colors duration-300"
                  >
                    {service.title}
                  </h3>
                  <p
                    data-tina-field={tinaField(service, "description")}
                    className="text-dorabel-gray-dim leading-relaxed mb-6 font-light text-base flex-grow"
                  >
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    {(previewMode || !previewMode) && (
                      <>
                        {service.features && service.features.length > 0 ? (
                          <ul className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-dorabel-gray-dim text-base tracking-wide"
                              >
                                <svg
                                  className="w-5 h-5 text-dorabel-gold mr-3 flex-shrink-0"
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
                                <span className="w-1.5 h-1.5 bg-dorabel-gold rounded-full mr-3 flex-shrink-0 hidden"></span>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-400 italic">
                            Features not listed.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {previewMode && (
          <div className="flex justify-center mt-24">
            <Link
              to="/services"
              data-tina-field={data ? tinaField(data, "buttonText") : null}
              className="px-12 py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-bold rounded-xl transition-all duration-500 shadow-sm text-sm tracking-widest uppercase hover:px-14"
            >
              {data?.buttonText || "See All Services"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
