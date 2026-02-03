import React from "react";
import Turnstile from "react-turnstile";

const TurnstileCaptcha = ({ onVerify }) => {
  const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;

  if (!siteKey) {
    console.warn("Cloudflare Site Key is missing. Check your .env file.");
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
        Captcha Error: Missing Site Key
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
        Security Check
      </label>
      <Turnstile
        sitekey={siteKey}
        onVerify={(token) => onVerify(true)}
        onError={() => onVerify(false)}
        onExpire={() => onVerify(false)}
        theme="light"
      />
    </div>
  );
};

export default TurnstileCaptcha;
