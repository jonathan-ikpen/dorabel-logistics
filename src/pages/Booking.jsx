import React, { useState, useEffect } from "react";
import { useSeo } from "../utils/seo";
import { useLoadingStore } from "../store/loading";

import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import BookingForm from "../components/BookingForm";
import Process from "../components/Process";
import Services from "../components/Services";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import LoadingSpinner from "../components/LoadingSpinner";
import { Reveal } from "../components/Reveal";
import { tinaField } from "tinacms/dist/react";

const PageHeader = ({ data }) => {
  return (
    <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={data.image || "/images/hero_building.png"}
          alt="Page Header"
          data-tina-field={tinaField(data, "image")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dorabel-purple opacity-70 mix-blend-multiply" />
      </div>
      <div className="relative z-10 container mx-auto px-6 text-left">
        <Reveal>
          <h1
            data-tina-field={tinaField(data, "heading")}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6"
          >
            {data.heading}
          </h1>
          <p
            data-tina-field={tinaField(data, "subheading")}
            className="text-xl text-gray-200 max-w-2xl font-light"
          >
            {data.subheading}
          </p>
        </Reveal>
      </div>
    </div>
  );
};

const BookingContent = ({ initialData }) => {
  const { data: tinaData } = useTina({
    query: initialData.query,
    variables: initialData.variables || {},
    data: initialData.data || {},
  });

  useSeo(tinaData?.page);

  const setPageLoaded = useLoadingStore((state) => state.setPageLoaded);

  useEffect(() => {
    if (tinaData?.page) {
      setPageLoaded(true);
    }
  }, [tinaData, setPageLoaded]);

  if (!tinaData?.page) {
    return <LoadingSpinner />;
  }

  const { blocks } = tinaData.page;

  return (
    <div className="pt-20">
      {blocks?.map((block, i) => {
        switch (block.__typename) {
          case "PageBlocksPageHeader":
            return <PageHeader key={i} data={block} />;
          case "PageBlocksBooking":
            return <BookingForm key={i} data={block} />;
          case "PageBlocksProcess":
            return <Process key={i} data={block} />;
          case "PageBlocksServices":
            return <Services key={i} previewMode={true} data={block} />;
          case "PageBlocksCta":
            return <CTA key={i} data={block} />;
          case "PageBlocksFaq":
            return <FAQ key={i} data={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

const Booking = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.page({ relativePath: "booking.md" });
        setData(res);
      } catch (e) {
        console.error("Error fetching Tina data:", e);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <LoadingSpinner />;
  }

  return <BookingContent initialData={data} />;
};

export default Booking;
