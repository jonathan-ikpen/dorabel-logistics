import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { submitContact } from "../api/mockApi";

const ContactForm = ({ data }) => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    serviceInterest: "Procurement & Coordination",
    message: "",
    form_type: "contact",
  });
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  if (!data) return null;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await submitContact(state);
      setResult(res);
      setState({
        name: "",
        email: "",
        serviceInterest: "",
        message: "",
        form_type: "contact",
      });
    } catch (err) {
      setError(
        err.code === 422
          ? "Please complete required fields."
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span
              data-tina-field={tinaField(data, "subheading")}
              className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-4 block"
            >
              {data.subheading || "Get in Touch"}
            </span>
            <div className="h-[1px] w-12 bg-gray-200 mb-8"></div>
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mt-3 mb-8 leading-tight"
            >
              {data.heading || "Ready to Elevate Your Property?"}
            </h2>
            <p
              data-tina-field={tinaField(data, "intro")}
              className="text-dorabel-gray-dim text-lg mb-16 font-light leading-relaxed"
            >
              {data.intro ||
                "Contact us today for a bespoke consultation. We're here to help you manage your facilities with ease and efficiency."}
            </p>

            <div className="space-y-10 pl-6 border-l border-gray-100">
              <div className="block">
                <h4 className="font-heading font-bold text-dorabel-purple text-xl mb-2">
                  Visit Us
                </h4>
                <p
                  data-tina-field={tinaField(data, "address")}
                  className="text-dorabel-gray-dim font-light"
                >
                  {data.address ||
                    "Bartle House, 9 Oxford Court,\nManchester, M2 3WQ"}
                </p>
              </div>

              <div className="block">
                <h4 className="font-heading font-bold text-dorabel-purple text-xl mb-2">
                  Email Us
                </h4>
                <div className="space-y-1">
                  <a
                    href={`mailto:${data.email || "info@dorabel.co.uk"}`}
                    data-tina-field={tinaField(data, "email")}
                    className="text-dorabel-gray-dim hover:text-dorabel-gold transition-colors block font-light"
                  >
                    {data.email || "info@dorabel.co.uk"}
                  </a>
                  <a
                    href={`mailto:${
                      data.secondaryEmail || "support@dorabel.co.uk"
                    }`}
                    data-tina-field={tinaField(data, "secondaryEmail")}
                    className="text-dorabel-gray-dim hover:text-dorabel-gold transition-colors block font-light"
                  >
                    {data.secondaryEmail || "support@dorabel.co.uk"}
                  </a>
                </div>
              </div>

              <div className="block">
                <h4 className="font-heading font-bold text-dorabel-purple text-xl mb-2">
                  Call Us
                </h4>
                <a
                  href={`tel:${data.phone || "+447539531014"}`}
                  data-tina-field={tinaField(data, "phone")}
                  className="text-dorabel-gray-dim hover:text-dorabel-gold transition-colors font-light"
                >
                  {data.phone || "+44 7539 531 014"}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-12 shadow-sm border border-gray-100 rounded-2xl">
            <h3 className="text-2xl font-heading font-bold text-dorabel-purple mb-8">
              Send us a Message
            </h3>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-xl placeholder-gray-300"
                    placeholder="John Doe"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={state.phone}
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="0161 456 7890"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={state.message}
                  onChange={(e) =>
                    setState({ ...state, message: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-dorabel-purple hover:bg-dorabel-gold text-white font-medium transition-all duration-300 shadow-sm rounded-xl tracking-widest uppercase text-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              <AnimatePresence>
                {(result || error) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mt-4 p-4 flex items-center justify-between gap-3 ${
                      result
                        ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                        : "bg-red-50 text-red-800 border-l-4 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-sm">
                          {result?.status === "ok" ? "Message Sent!" : "Error"}
                        </p>
                        <p className="text-xs opacity-90">
                          {result?.status === "ok"
                            ? "We will be in touch shortly."
                            : error}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setError(null);
                      }}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      X
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
