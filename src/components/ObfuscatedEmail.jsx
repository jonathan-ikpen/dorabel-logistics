import React from "react";

const ObfuscatedEmail = ({ email, className, ...props }) => {
  const reverse = (s) => s.split("").reverse().join("");

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      {...props}
      style={{
        unicodeBidi: "bidi-override",
        direction: "rtl",
        textAlign: "left",
      }}
    >
      {reverse(email)}
    </a>
  );
};

export default ObfuscatedEmail;
