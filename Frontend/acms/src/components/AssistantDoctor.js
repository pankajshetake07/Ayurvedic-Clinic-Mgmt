import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { FaUserMd, FaUserPlus, FaCalendarAlt, FaEdit, FaSignOutAlt } from "react-icons/fa";
import AddPatient from "./AddPatient";
import View_Appointment from "./View_Appointments";
import Update_Patient from "./Update_Patient";

import Logout from "./logout";
import logo from "../images/LogoPrakritiSync.png";
import AssistantDoctorProfile from "../components/AssistantDoctorProfile";
import "../styles/AssistantDoctor.css"
import AdminAppointments from "./AdminViewAppointments";

function AssistantDoctor() {
  const [assDoctorName, setAdminName] = useState("Assistant Doctor");

  useEffect(() => {
    const storedAssitantName = localStorage.getItem("userName") || "Assistant Doctor";
    setAdminName(storedAssitantName);
  }, []);

  return (
    <div className="container-fluid">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="navbar-brand">
          <img src={logo} alt="PrakritiSync Logo" className="logo" />
        </div>
        <div>
          <h2 className="assDoctor-name">Welcome {assDoctorName}</h2>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary m-2" to="/assistance_doctor_home/patientDetails">
                <FaUserPlus /> Add Patient
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary m-2" to="/assistance_doctor_home/appointment">
                <FaCalendarAlt /> Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary m-2" to="/assistance_doctor_home/updatepatient">
                <FaEdit /> Update Patient
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary m-2" to="/assistance_doctor_home/profile">
                <FaUserMd /> Profile
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginTop: "10px", marginLeft: "80px" }}>
              <Logout />
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-box">
          <Routes>
            <Route path="/" element={<div style={{ marginTop: "100px", textAlign: "center" }}><h1>Welcome! {assDoctorName}</h1></div>} />
            <Route path="/patientDetails" element={<AddPatient />} />
            <Route path="/appointment" element={<AdminAppointments />} />
            <Route path="/updatepatient" element={<Update_Patient />} />
            <Route path="/profile" element={<AssistantDoctorProfile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AssistantDoctor;