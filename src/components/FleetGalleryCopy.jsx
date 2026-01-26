import React from "react";
import { Reveal } from "./Reveal";
import fleetAir from "../assets/fleet_air.png";
import fleetSea from "../assets/fleet_sea.png";
import fleetRoad from "../assets/fleet_road.png";
import fleetWarehouse from "../assets/fleet_warehouse.png";

const FleetGallery = () => {
  const images = [
    { src: fleetAir, title: "Air Freight", sub: "Global Express" },
    { src: fleetSea, title: "Sea Freight", sub: "International Shipping" },
    { src: fleetRoad, title: "Road Freight", sub: "Domestic Transport" },
    { src: fleetWarehouse, title: "Warehousing", sub: "Storage Solutions" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-4 block">
              Global Operations
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple">
              Our Fleet & Reach
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((item, index) => (
            <Reveal key={index} delay={index * 0.1} width="100%">
              <div className="group relative h-[400px] overflow-hidden rounded-none shadow-2xl cursor-pointer border border-gray-100">
                {/* Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-dorabel-gold text-xs font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.sub}
                  </p>
                  <h3 className="text-white text-2xl font-bold font-heading">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetGallery;
