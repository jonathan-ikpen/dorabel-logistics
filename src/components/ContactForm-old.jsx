import React from "react";
import { submitContact } from "../api/mockApi";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await submitContact(state);
      setResult(res);
      setState({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(
        err.code === 422
          ? "Please complete required fields."
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!state.name || !state.email || !state.message) {
        const e = new Error("validation");
        e.code = 422;
        throw e;
      }

      const formData = new FormData(event.target);
      formData.append("access_key", "bafc5bd0-0441-4072-b07c-440fa6a66d01");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          status: "ok",
          id: Math.random().toString(36).slice(2, 9),
          data,
        });
        setState({ name: "", email: "", phone: "", message: "" });
      } else {
        setResult({
          status: "error",
          id: Math.random().toString(36).slice(2, 9),
          data,
        });
      }
    } catch (err) {
      setError(
        err.code === 422
          ? "Please complete required fields."
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-2xl glass p-6 rounded-xl"
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Name
          </span>
          <input
            required
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Email
          </span>
          <input
            type="email"
            required
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent"
          />
        </label>
        <label className="flex flex-col sm:col-span-2">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Phone (optional)
          </span>
          <input
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent"
          />
        </label>
        <label className="flex flex-col sm:col-span-2">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Message
          </span>
          <textarea
            required
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            rows="4"
            className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-emerald-600 text-white"
        >
          {loading ? "Sending..." : "Send message"}
        </button>
        {result && (
          <span className="text-sm text-emerald-700">
            Thank you — ref {result.id}
          </span>
        )}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  );
}
