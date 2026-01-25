import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { submitContact } from "../api/mockApi";

const BookingForm = ({ data }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Logistics",
    date: "",
    time: "",
    pickupLocation: "",
    deliveryLocation: "",
    cargoDetails: "",
    message: "",
    form_type: "booking",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
        phone: "",
        serviceType: "Logistics",
        date: "",
        time: "",
        pickupLocation: "",
        deliveryLocation: "",
        cargoDetails: "",
        message: "",
        form_type: "booking",
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

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking-form" className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-dorabel-gold font-medium uppercase tracking-widest text-xs mb-4 block">
              Book an Appointment
            </span>
            <h2
              data-tina-field={data ? tinaField(data, "heading") : null}
              className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mb-6"
            >
              {data?.heading || "Schedule Your Service"}
            </h2>
            <div className="h-[1px] w-24 bg-dorabel-gold mx-auto mb-8"></div>
            <p
              data-tina-field={data ? tinaField(data, "subheading") : null}
              className="text-dorabel-gray-dim text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              {data?.subheading ||
                "Fill out the form below to schedule a consultation or book our logistics services directly."}
            </p>
          </div>

          <div className="bg-[#FAFAFA] p-8 md:p-12 shadow-sm border border-gray-100">
            <form className="space-y-8" onSubmit={onSubmit}>
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={state.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={state.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={state.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="+44 7949 937023"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Service Type
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={state.serviceType}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md appearance-none"
                    >
                      <option>Logistics</option>
                      <option>Transport Support</option>
                      <option>Procurement</option>
                      <option>Facility Management</option>
                      <option>Strategic Planning</option>
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
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={state.date}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={state.time}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Logistics Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={state.pickupLocation}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="City, Postcode"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={state.deliveryLocation}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="City, Postcode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Cargo Details / Specific Requirements
                </label>
                <textarea
                  name="cargoDetails"
                  rows="3"
                  value={state.cargoDetails}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="Describe your cargo, weight, dimensions, or special handling needs..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={state.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="Any other details we should know?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-medium transition-all duration-300 shadow-sm rounded-md tracking-widest uppercase text-sm"
              >
                {loading ? "Scheduling..." : "Book Appointment"}
              </button>

              <AnimatePresence>
                {(result || error) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mt-6 p-4 flex items-center justify-between gap-3 ${
                      result
                        ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                        : "bg-red-50 text-red-800 border-l-4 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-sm">
                          {result?.status === "ok"
                            ? "Request Submitted!"
                            : "Error"}
                        </p>
                        <p className="text-xs opacity-90">
                          {result?.status === "ok"
                            ? `Ref: ${result.id} - We will confirm shortly.`
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

export default BookingForm;
