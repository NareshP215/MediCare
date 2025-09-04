import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import "./DepartmentDoctors.css"; // Import the CSS

const DepartmentDoctors = () => {
  const { department } = useParams();
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://medicare-r4rk.onrender.com/api/v1/user/docters",
          { withCredentials: true }
        );
        const filteredDoctors = data.docters.filter(
          (doctor) => doctor.docterDepartment === department
        );
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, [department]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    // <>
    //   <section
    //     className="page doctors"
    //     style={{ paddingTop: "20rem", padding: "5rem" }}
    //   >
    //     <h1
    //       className="doctor-title"
    //       style={{ marginTop: "3rem", marginBottom: "1rem" }}
    //     >
    //       {department} Doctors
    //     </h1>
    //     <div className="banner">
    //       {doctors && doctors.length > 0 ? (
    //         doctors.map((element) => {
    //           return (
    //             <div className="card" key={element._id}>
    //               <img
    //                 src={element.docAvatar && element.docAvatar.url}
    //                 alt="doctor avatar"
    //               />
    //               <h4>{`${element.firstName} ${element.lastName}`}</h4>
    //               <div className="details">
    //                 <p>
    //                   Email: <span>{element.email}</span>
    //                 </p>
    //                 <p>
    //                   Phone: <span>{element.phone}</span>
    //                 </p>
    //                 <p>
    //                   DOB: <span>{element.dob.substring(0, 10)}</span>
    //                 </p>
    //                 <p>
    //                   Department: <span>{element.docterDepartment}</span>
    //                 </p>
    //                 <p>
    //                   Gender: <span>{element.gender}</span>
    //                 </p>
    //               </div>
    //             </div>
    //           );
    //         })
    //       ) : (
    //         <h1>No Registered Doctors Found in {department}!</h1>
    //       )}
    //     </div>
    //   </section>
    // </>
    <section className="page doctors">
      <h1>All Doctors</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.docterDepartment}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default DepartmentDoctors;
