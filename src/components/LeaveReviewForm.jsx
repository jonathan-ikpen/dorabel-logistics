import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { submitContact } from "../api/mockApi";

const LeaveReviewForm = ({ data }) => {
  const [state, setState] = useState({
    name: "",
    role: "", // Used for Company/Role
    rating: 5,
    title: "", // Review Title
    message: "", // Review Content
    form_type: "review",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Basic validation
    if (!state.rating || !state.message || !state.name) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await submitContact(state);
      setResult(res);
      setState({
        name: "",
        role: "",
        rating: 5,
        title: "",
        message: "",
        form_type: "review",
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

  const setRating = (rating) => {
    setState({ ...state, rating });
  };

  return (
    <section id="review-form" className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-dorabel-gold font-bold uppercase tracking-widest text-xs mb-4 block">
              Share Your Experience
            </span>
            <h2
              data-tina-field={data ? tinaField(data, "heading") : null}
              className="text-4xl md:text-5xl font-heading font-bold text-dorabel-purple mb-6"
            >
              {data?.heading || "Leave a Review"}
            </h2>
            <div className="h-[1px] w-24 bg-dorabel-gold mx-auto mb-8"></div>
            <p
              data-tina-field={data ? tinaField(data, "subheading") : null}
              className="text-dorabel-gray-dim text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              {data?.subheading ||
                "We value your feedback. Let us know how we did."}
            </p>

            {/* Google Review Link */}
            {data?.googleReviewLink && (
              <div className="mt-8">
                <a
                  href={data.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-dorabel-purple font-bold hover:text-dorabel-gold transition-colors border-b border-dorabel-purple/20 hover:border-dorabel-gold pb-1"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.15-.15-2.15z" />
                  </svg>
                  Also rate us on Google
                </a>
              </div>
            )}
          </div>

          <div className="bg-[#FAFAFA] p-8 md:p-12 shadow-sm border border-gray-100">
            <form className="space-y-8" onSubmit={onSubmit}>
              {/* Star Rating Section */}
              <div className="flex flex-col items-center justify-center mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-4">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none transition-transform duration-200 hover:scale-110"
                    >
                      <svg
                        className={`w-10 h-10 ${
                          star <= (hoverRating || state.rating)
                            ? "text-dorabel-gold fill-current"
                            : "text-gray-300 fill-current"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

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
                    Company / Role (Optional)
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={state.role}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                    placeholder="e.g. CEO, Tech Solutions Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={state.title}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="e.g. Excellent Service!"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
                  Your Review
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={state.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-dorabel-purple focus:outline-none focus:border-dorabel-gold transition-colors rounded-md placeholder-gray-300"
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-dorabel-purple hover:bg-dorabel-gold text-white font-bold transition-all duration-300 shadow-sm rounded-md tracking-widest uppercase text-sm"
              >
                {loading ? "Submitting..." : "Submit Review"}
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
                            ? "Review Submitted!"
                            : "Error"}
                        </p>
                        <p className="text-xs opacity-90">
                          {result?.status === "ok"
                            ? "Thank you for your feedback."
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

export default LeaveReviewForm;
