import React from "react";
import Hero from "../componets/Hero";
import Model from "../componets/Model";

const CheckUp = () => {
  return (
    <>
      <Hero
        title={"Check Your Symptoms | MediCare AI Health Advisor "}
        desc={
          "MediCare AI Health Advisor is an intelligent, state-of-the-art system designed to analyze your symptoms and provide tailored health guidance instantly. Using advanced machine learning, our tool suggests possible conditions, appropriate medications, dietary plans, and workout routines to support your recovery and well-being."
        }
        desc2={
          "At MediCare, we combine medical expertise with cutting-edge technology to help you make informed decisions about your health — anytime, anywhere."
        }
        imageUrl={"/model.png"}
      />
      <Model />
    </>
  );
};

export default CheckUp;
