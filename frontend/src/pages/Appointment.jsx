import React from "react";
import Hero from "../componets/Hero";
import AppointmentForm from "../componets/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment At MediCare"}
        desc={
          "MediCare is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At MediCare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness."
        }
        imageUrl={"/apponitment.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
