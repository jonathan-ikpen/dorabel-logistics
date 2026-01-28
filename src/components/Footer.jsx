import React, { useState } from "react";
const defaultLogo = "/logo/logo-white-with-text.svg";
import { tinaField } from "tinacms/dist/react";
import { subscribeNewsletter } from "../api/mockApi";

export default function Footer({ headerData, footerData }) {
  const logoSrc = footerData?.logo || headerData?.logo || defaultLogo;
  const companyName = headerData?.companyName || "Dorabel International";
  const tagline =
    headerData?.tagline ||
    "Professional coordination and facility management services. Bridging the gap between landlords, agents, and service providers with efficiency and trust.";

  const serviceItems = footerData?.serviceLinks || [
    { label: "Procurement", url: "/services" },
    { label: "Facility Management", url: "/services" },
    { label: "Property Inspections", url: "/services" },
    { label: "Maintenance & Repairs", url: "/services" },
    { label: "Leave a Review", url: "/leave-review" },
  ];

  const legalItems = footerData?.legalLinks || [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms of Service", url: "/terms-of-service" },
    { label: "Cookie Policy", url: "/cookie-policy" },
  ];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus("idle");
    try {
      const res = await subscribeNewsletter(email);
      if (res.status === "ok") {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-dorabel-purple-dark text-gray-200 frounded-t-[40px] pt-20 pb-12 mt-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoSrc}
                alt={companyName}
                data-tina-field={
                  footerData ? tinaField(footerData, "logo") : ""
                }
                className="h-10 w-auto"
              />
              <span className="font-heading font-medium text-xl text-white tracking-tight hidden">
                {companyName === "Dorabel International" ? (
                  <>
                    Dorabel{" "}
                    <span className="text-dorabel-gold italic">Intl.</span>
                  </>
                ) : (
                  <span
                    data-tina-field={
                      headerData ? tinaField(headerData, "companyName") : ""
                    }
                  >
                    {companyName}
                  </span>
                )}
              </span>
            </div>
            <p
              data-tina-field={
                headerData ? tinaField(headerData, "tagline") : ""
              }
              className="text-sm leading-relaxed mb-6 font-light hidden"
            >
              {tagline}
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-white font-heading font-medium mb-8 text-lg">
              Services
            </h4>
            <ul className="space-y-4 text-sm">
              {serviceItems.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    data-tina-field={
                      footerData?.serviceLinks
                        ? tinaField(footerData.serviceLinks[i], "label")
                        : null
                    }
                    className="text-gray-300 hover:text-dorabel-gold transition-colors block font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-medium mb-8 text-lg">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-4">
                <svg
                  className="w-5 h-5 text-dorabel-gold mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span
                  data-tina-field={
                    footerData?.contact
                      ? tinaField(footerData.contact, "address")
                      : null
                  }
                  className="whitespace-pre-wrap"
                >
                  {footerData?.contact?.address ||
                    "8, Kestrel Grove,\nBoroughbridge, YO51 9RX"}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-dorabel-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${footerData?.contact?.phone || "+447949937023"}`}
                  data-tina-field={
                    footerData?.contact
                      ? tinaField(footerData.contact, "phone")
                      : null
                  }
                  className="hover:text-white transition-colors"
                >
                  {footerData?.contact?.phone || "07949937023"}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-dorabel-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${
                    footerData?.contact?.email || "info@dorabel.co.uk"
                  }`}
                  data-tina-field={
                    footerData?.contact
                      ? tinaField(footerData.contact, "email")
                      : null
                  }
                  className="hover:text-white transition-colors"
                >
                  {footerData?.contact?.email || "info@dorabel.co.uk"}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-white font-heading font-medium mb-8 text-lg"
              data-tina-field={
                footerData?.newsletter
                  ? tinaField(footerData.newsletter, "heading")
                  : null
              }
            >
              {footerData?.newsletter?.heading || "Stay Updated"}
            </h4>
            <p
              className="text-sm mb-6 font-light"
              data-tina-field={
                footerData?.newsletter
                  ? tinaField(footerData.newsletter, "text")
                  : null
              }
            >
              {footerData?.newsletter?.text ||
                "Subscribe to our newsletter for the latest property insights."}
            </p>
            {status === "success" ? (
              <div className="bg-dorabel-gold/10 border border-dorabel-gold p-4 rounded-none">
                <p className="text-dorabel-gold text-sm font-semibold">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <div>
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="bg-dorabel-purple-light border border-dorabel-purple-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-dorabel-gold w-full text-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-dorabel-gold hover:bg-dorabel-gold-dark text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </button>
                </form>
                {status === "error" && (
                  <p className="text-red-400 text-xs mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-dorabel-purple-light pt-8 flex justify-center text-xs font-light tracking-wide">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
