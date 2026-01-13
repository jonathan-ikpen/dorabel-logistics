import React, { useState, useEffect } from "react";
import { useSeo } from "../utils/seo";
import { useLoadingStore } from "../store/loading";

import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import AboutComponent from "../components/About";
import Process from "../components/Process";
import LoadingSpinner from "../components/LoadingSpinner";

import Services from "../components/Services";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import { Reveal } from "../components/Reveal";
import { tinaField } from "tinacms/dist/react";

// Inline PageHeader Component
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
            className="text-xl text-gray-200 max-w-2xl mx-auto font-light"
          >
            {data.subheading}
          </p>
        </Reveal>
      </div>
    </div>
  );
};

// Inline ContentGrid Component (for Mission/Vision)
const ContentGrid = ({ data }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {data.items?.map((item, index) => (
            <Reveal key={index} delay={index * 0.2}>
              <h2
                data-tina-field={tinaField(item, "heading")}
                className="text-4xl font-heading font-bold text-dorabel-purple mb-6"
              >
                {item.heading}
              </h2>
              <p
                data-tina-field={tinaField(item, "content")}
                className="text-dorabel-gray-dim text-lg leading-relaxed mb-6"
              >
                {item.content}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutContent = ({ initialData }) => {
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
          case "PageBlocksContentGrid":
            return <ContentGrid key={i} data={block} />;
          case "PageBlocksAbout":
            return <AboutComponent key={i} data={block} />;
          case "PageBlocksProcess":
            return <Process key={i} data={block} />;
          case "PageBlocksServices":
            return <Services key={i} previewMode={true} data={block} />;
          case "PageBlocksCta":
            return <CTA key={i} data={block} />;
          case "PageBlocksContact":
            return <Contact key={i} data={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.page({ relativePath: "about.md" });
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

  return <AboutContent initialData={data} />;
};

export default About;
