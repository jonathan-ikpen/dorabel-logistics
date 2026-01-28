import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import fleetVan from "../assets/fleet_express_courier.png";
import fleetArtic from "../assets/fleet_national_haulage.png";
import fleetRigid from "../assets/fleet_regional_distribution.png";
import fleetWarehouse from "../assets/fleet_warehousing_interior.png";

const FleetGallery = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to Road Freight (index 1)

  const services = [
    {
      id: 0,
      title: "National Haulage",
      description:
        "High-capacity articulated lorries for bulk transport across the UK motorway network. We handle full truckloads (FTL) with precision, providing reliable scheduling for your nationwide distribution needs.",
      image: fleetArtic,
      cta: "Request Quote",
      link: "/contact",
    },
    {
      id: 1,
      title: "Regional Distribution",
      description:
        "Agile fleet of diverse vehicles provided for regional efficiency. Our modern fleet ensures reliable delivery for standard haulage across UK counties. From pallet distribution to multi-drop routes.",
      image: fleetRigid,
      cta: "Get in Touch",
      link: "/contact",
    },
    {
      id: 2,
      title: "Express Courier",
      description:
        "Rapid response vans for urgent, time-critical deliveries. When every minute counts, our direct drive service ensures your goods reach their destination safely and without delay anywhere in the mainland UK.",
      image: fleetVan,
      cta: "Contact Team",
      link: "/contact",
    },
    {
      id: 3,
      title: "Warehousing",
      description:
        "Secure, modern UK warehousing facilities for your inventory. We offer flexible storage solutions, stock management, and fulfillment services to streamline your domestic supply chain.",
      image: fleetWarehouse,
      cta: "Enquire Now",
      link: "/contact",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="md:w-1/2 mb-16">
          <Reveal>
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-2 block">
              Our Fleet & Reach
            </span>
            <div className="h-[1px] w-12 bg-gray-200 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mb-6 leading-tight">
              We Provide Best-in-Class{" "}
              <span className="ftext-dorabel-gold">Logistics Solutions</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-dorabel-gray-dim text-lg leading-relaxed font-light">
              From our dedicated fleet to our trusted network of regional
              partners, we have the capacity to move your goods anywhere in the
              UK with precision and care.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row shadow-2xl border border-gray-100 rounded-2xl overflow-hidden">
          {/* Left Side: Dynamic Image */}
          <div className="lg:w-1/2 order-2 lg:order-1 relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={services[activeTab].image}
                alt={services[activeTab].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Right Side: AccordionTabs */}
          <div className="lg:w-1/2 order-1 lg:order-2 bg-white flex flex-col">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`border-b border-gray-100 last:border-b-0 transition-[flex-grow] duration-300 ${
                  activeTab === index ? "flex-grow" : ""
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab(index);
                    }
                  }}
                  className={`w-full h-full text-left transition-all duration-300 cursor-pointer ${
                    activeTab === index
                      ? "bg-[#d97706]/65 py-10 px-10"
                      : "bg-white py-6 px-10 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`font-heading font-bold text-xl uppercase tracking-wide ${
                        activeTab === index
                          ? "text-dorabel-purple"
                          : "text-dorabel-purple"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        activeTab === index
                          ? "border-dorabel-purple bg-dorabel-purple text-white rotate-180"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeTab === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-dorabel-purple/80 leading-relaxed mb-8 max-w-md">
                          {service.description}
                        </p>
                        <Link to={service.link}>
                          <button className="bg-dorabel-purple text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-dorabel-purple transition-colors duration-300 shadow-sm rounded-xl">
                            {service.cta}
                          </button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetGallery;
