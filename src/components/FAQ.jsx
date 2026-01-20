import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { tinaField } from "tinacms/dist/react";
import { Link } from "react-router-dom";

const AccordionItem = ({ question, answer, isOpen, onClick, tinaData }) => {
  return (
    <div className="border-b border-transparent mb-6 transition-all duration-300">
      <button
        className="w-full flex items-start text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="mr-6 mt-1 flex-shrink-0 text-dorabel-purple transition-transform duration-300">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Simple Plus Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.div>
        </span>

        <div className="flex-grow">
          <span
            data-tina-field={tinaData ? tinaField(tinaData, "question") : null}
            className={`text-xl font-medium font-heading transition-colors block mb-2 ${
              isOpen
                ? "text-dorabel-purple"
                : "text-dorabel-purple/80 group-hover:text-dorabel-purple"
            }`}
          >
            {question}
          </span>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p
                  data-tina-field={
                    tinaData ? tinaField(tinaData, "answer") : null
                  }
                  className="pb-4 text-dorabel-gray-dim leading-relaxed font-sans text-base max-w-prose"
                >
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

const FAQ = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      {/* Container removed, using w-full with padding */}
      <div className="w-full px-6 lg:px-12 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Heading and Contact Info */}
          <div className="lg:col-span-4 xl:col-span-4">
            <Reveal width="100%">
              <div className="sticky top-32">
                <h2
                  data-tina-field={tinaField(data, "heading")}
                  className="text-5xl md:text-6xl font-heading font-bold text-dorabel-purple mb-8 leading-[1.1] tracking-tight"
                >
                  {/* Allow splitting the heading if needed, or just standard render */}
                  {data.heading ? (
                    data.heading.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}{" "}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="block">Frequently</span>
                      <span className="block">Asked</span>
                      <span className="block">Questions.</span>
                    </>
                  )}
                </h2>

                <div className="mt-12 text-dorabel-gray-dim text-sm font-sans">
                  <p className="mb-2">
                    Didn't find an answer to your question?
                  </p>
                  <Link
                    to="/contact"
                    className="text-dorabel-purple font-bold underline decoration-dorabel-gold hover:text-dorabel-gold transition-colors"
                  >
                    Contact us
                  </Link>
                  , and we'll be happy to help!
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accordion Questions */}
          {/* Pushed to far right by starting at col 7 (leaving 2 gap cols) */}
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7 pt-4">
            {(data.questions || []).map((faq, index) => (
              <Reveal key={index} delay={index * 0.1} width="100%">
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={index === openIndex}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  tinaData={faq}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
