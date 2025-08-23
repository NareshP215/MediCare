import React from "react";

const Hero = ({ title, desc, desc2, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>{desc}</p>
        <p>{desc2}</p>
      </div>

      <div className="banner">
        <img
          src={imageUrl}
          alt="hero"
          className="animated-image"
          style={{ borderRadius: 10 }}
        />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
