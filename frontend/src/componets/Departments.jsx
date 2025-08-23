import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pediatrics.png",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/orthopedics.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardiology.png",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neurology.png",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/oncology.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radiology.png",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.png",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <Link
                to={`/doctors/${depart.name}`}
                key={index}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card">
                  <div className="depart-name">{depart.name}</div>
                  <img src={depart.imageUrl} alt="Department" />
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
