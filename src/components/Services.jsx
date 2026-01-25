import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import maintenanceImg from "../assets/service_van.png";
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
    <section id="services" className="py-24 bg-white">
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
          className={`grid grid-cols-1 gap-x-12 gap-y-24 ${
            previewMode ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {displayedServices.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <MaskReveal
                delay={index * 0.1}
                className="h-[350px] mb-8 overflow-hidden relative"
              >
                <img
                  src={service.image || heroBuildingImg}
                  alt={service.title}
                  data-tina-field={tinaField(service, "image")}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 p-6 bg-white z-10 border-b border-l border-gray-100">
                  <span className="font-heading font-bold text-2xl text-dorabel-purple">
                    {service.icon || `0${index + 1}`}
                  </span>
                </div>
              </MaskReveal>

              <Reveal delay={0.2 + index * 0.1}>
                <h3
                  data-tina-field={tinaField(service, "title")}
                  className="text-3xl font-heading font-bold text-dorabel-purple mb-4 group-hover:text-dorabel-gold transition-colors duration-500"
                >
                  {service.title}
                </h3>
                <p
                  data-tina-field={tinaField(service, "description")}
                  className="text-dorabel-gray-dim leading-relaxed mb-6 font-light border-l border-gray-200 pl-6 group-hover:border-dorabel-gold transition-colors duration-500"
                >
                  {service.description}
                </p>
                {!previewMode && service.features && (
                  <ul className="space-y-3 pl-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-dorabel-gray-dim text-sm tracking-wide"
                      >
                        <span className="w-1.5 h-1.5 bg-dorabel-gold rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </div>
          ))}
        </div>

        {previewMode && (
          <div className="flex justify-center mt-24">
            <Link
              to="/services"
              data-tina-field={data ? tinaField(data, "buttonText") : null}
              className="px-12 py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-bold rounded-md transition-all duration-500 shadow-sm text-sm tracking-widest uppercase hover:px-14"
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
