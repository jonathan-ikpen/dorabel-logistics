import React from "react";

export default function Badge({ children, className = "" }) {
  return (
    <span className={"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 " + className}>
      {children}
    </span>
  );
}
