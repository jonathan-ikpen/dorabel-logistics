import React from "react";
import MathCaptcha from "./MathCaptcha";
import TurnstileCaptcha from "./TurnstileCaptcha";

const CaptchaWrapper = ({ onVerify, type }) => {
  // Determine Type: Prop override > Env Var > Default (Math)
  const envType = import.meta.env.VITE_CAPTCHA_TYPE;
  const captchaType = type || envType || "math";

  if (captchaType === "cloudflare") {
    return <TurnstileCaptcha onVerify={onVerify} />;
  }

  return <MathCaptcha onVerify={onVerify} />;
};

export default CaptchaWrapper;
