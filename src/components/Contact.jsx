import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { submitContact } from "../api/mockApi";

const Contact = ({ data }) => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    serviceInterest: "Procurement & Coordination",
    message: "",
    form_type: "appointment",
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
        form_type: "appointment",
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
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-dorabel-gray flex items-center justify-center text-dorabel-gold">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-dorabel-purple text-xl mb-2">
                    Visit Us
                  </h4>
                  <p
                    data-tina-field={tinaField(data, "address")}
                    className="text-dorabel-gray-dim font-light"
                  >
                    {data.address ||
                      "Bartle House,\n9 Oxford Court,\nManchester, M2 3WQ"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-dorabel-gray flex items-center justify-center text-dorabel-gold">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
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
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-dorabel-gray flex items-center justify-center text-dorabel-gold">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-dorabel-purple text-xl mb-2">
                    Call Us
                  </h4>
                  <a
                    href={`tel:${data.phone || "07949937023"}`}
                    data-tina-field={tinaField(data, "phone")}
                    className="text-dorabel-gray-dim hover:text-dorabel-gold transition-colors font-light"
                  >
                    {data.phone || "07949937023"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-12 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading font-bold text-dorabel-purple mb-8">
              Request a Consultation
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
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
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
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    value={state.serviceInterest}
                    onChange={(e) =>
                      setState({ ...state, serviceInterest: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md appearance-none"
                  >
                    <option>Procurement & Coordination</option>
                    <option>Logistics</option>
                    <option>Transport Support</option>
                    <option>Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dorabel-purple">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
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
                className="w-full py-4 bg-dorabel-purple hover:bg-dorabel-gold text-white font-medium transition-all duration-300 shadow-sm rounded-md tracking-widest uppercase text-sm"
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
                            ? `Ref: ${result.id}`
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

export default Contact;
