import React from "react";
import Hero from "../componets/Hero";
import Biography from "../componets/Biography";
import Departments from "../componets/Departments";
import MessageForm from "../componets/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to MediCare | Your Trusted Healthcare Provider"}
        desc={
          "MediCare is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At MediCare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness."
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/weare.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
