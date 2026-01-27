import React from "react";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <img src="/images/logo.svg" alt="Dorabel Logo" className="h-8 w-auto" />
    <span className="text-gray-700 dark:text-gray-200 font-bold text-lg">
      Dorabel Admin
    </span>
  </div>
);
