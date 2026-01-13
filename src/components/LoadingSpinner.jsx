import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh]">
      <div className="relative w-16 h-16 mb-4">
        {/* Navy Ring Background */}
        <div className="absolute inset-0 border-4 border-dorabel-purple/10 rounded-full"></div>
        {/* Emerald Spinning Ring */}
        <div className="absolute inset-0 border-4 border-dorabel-gold rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="text-dorabel-purple font-heading font-medium tracking-widest text-sm animate-pulse">
        LOADING
      </span>
    </div>
  );
};

export default LoadingSpinner;
