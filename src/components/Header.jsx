import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

export default function Header() {
  const toggleTheme = useStore((s) => s.toggleTheme);
  const user = useStore((s) => s.user);

  return (
    <header className="w-full sticky top-0 z-40 glass backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            aria-label="Dorabel International home"
            className="flex items-center gap-3"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className="rounded"
            >
              <defs>
                <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#07d4a3" />
                  <stop offset="1" stopColor="#083a5a" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="14" fill="url(#g2)"></rect>
              <g transform="translate(18,18)" fill="#fff">
                <path d="M16 56V26L34 14l18 12v30z" opacity="0.95" />
                <path
                  d="M34 14c6 0 12 5 12 11s-6 11-12 11-12-5-12-11 6-11 12-11z"
                  fill="#07d4a3"
                  opacity="0.95"
                />
              </g>
            </svg>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Dorabel International
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-300">
                Logistics & Transport Services
              </div>
            </div>
          </Link>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Primary"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-emerald-300/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <a
              href="tel:07949937023"
              className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 bg-dorabel-purple text-white hover:bg-dorabel-gold transition-colors rounded-md"
            >
              <span className="text-emerald-600 font-medium">Call</span>
              <span className="text-slate-600 dark:text-slate-200">
                07949937023
              </span>
            </a>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-md focus:outline-none focus:ring"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute right-4 mt-2 w-56 glass rounded-md p-3 shadow-lg"
        >
          <nav className="flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="px-2 py-2">
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="px-2 py-2"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="px-2 py-2"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="px-2 py-2"
            >
              Contact
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="px-2 py-2"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
