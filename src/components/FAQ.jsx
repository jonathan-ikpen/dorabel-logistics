import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";

const AccordionItem = ({ question, answer, isOpen, onClick, tinaData }) => {
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span
          data-tina-field={tinaData ? tinaField(tinaData, "question") : null}
          className={`text-lg font-medium transition-colors ${
            isOpen
              ? "text-dorabel-gold"
              : "text-dorabel-purple group-hover:text-dorabel-gold"
          }`}
        >
          {question}
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-5 h-5 text-dorabel-gray-dim"
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
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              data-tina-field={tinaData ? tinaField(tinaData, "answer") : null}
              className="pb-6 text-dorabel-gray-dim leading-relaxed"
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <Reveal width="full" className="text-center !w-full">
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="text-3xl font-bold text-dorabel-purple mb-4 text-center"
            >
              {data.heading || "Frequently Asked Questions"}
            </h2>
            <p
              data-tina-field={tinaField(data, "subheading")}
              className="text-dorabel-gray-dim text-center"
            >
              {data.subheading ||
                "Everything you need to know about our services and how we work."}
            </p>
          </Reveal>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 p-8">
          {(data.questions || []).map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              tinaData={faq}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
