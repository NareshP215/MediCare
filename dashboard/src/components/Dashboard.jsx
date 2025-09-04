import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const { isAuthenticated, user } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://medicare-r4rk.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log(`some error occured while fetching appointments`, error);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://medicare-r4rk.onrender.com/api/v1/user/docters",
          { withCredentials: true }
        );
        setDoctors(data.docters);
      } catch (error) {
        setDoctors([]);
        console.log(`some error occured while fetching appointments`, error);
      }
    };
    fetchDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://medicare-r4rk.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`} </h5>
              </div>
              <p>
                This is your admin dashboard where you can manage user requests,
                review data, and oversee system operations. Stay updated with
                the latest activity and take quick actions when needed.
              </p>
            </div>
          </div>

          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>All Appointments</h5>
          <hr></hr>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointments) => {
                  return (
                    <tr key={appointments._id}>
                      <td>{`${appointments.firstName} ${appointments.lastName}`}</td>
                      <td>{appointments.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointments.docter.firstName} ${appointments.docter.lastName}`}</td>
                      <td>{appointments.department}</td>
                      <td>
                        <select
                          className={
                            appointments.status === "Pending"
                              ? "value-pending"
                              : appointments.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointments.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointments._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointments.hasVisited ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">
                    <h1>No Appointments</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
