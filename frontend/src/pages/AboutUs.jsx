import React from "react";
import Hero from "../componets/Hero";
import Biography from "../componets/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About MediCare"}
        desc={
          "At MediCare, we are dedicated to redefining healthcare through compassion, innovation, and expertise. Our state-of-the-art facility offers a full spectrum of medical services, supported by a team of highly qualified doctors, specialists, and healthcare professionals. We believe in treating every patient as an individual, providing personalized care plans that address medical needs while promoting overall well-being. Whether it’s preventive care, advanced diagnostics, or recovery support, our mission is to guide you toward a healthier, happier life every step of the way."
        }
        imageUrl={"/aboutus.png"}
      />
      <Biography imageUrl={"/biography.png"} />
    </>
  );
};

export default AboutUs;
