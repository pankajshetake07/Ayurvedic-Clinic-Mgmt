import React from "react";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FaUserMd, FaUserPlus, FaCalendarAlt, FaEdit, FaSignOutAlt } from "react-icons/fa";
import Adashboard from "./DashBoard"
import AddPatient from "./AddPatient"
import View_Appointment from "./View_Appointments"
import Update_Patient from "./Update_Patient"
import "../styles/AssistantDoctor.css"; // Import the CSS file

const logout = () => {
  if (window.confirm("Do you want to logout?")) {
    console.log("Logged out");

  }
};

function AssistantDoctor() {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="top-navbar">
        <div>
          <p className="doctor-name"><h3><strong>Dr.Pankaj Shetake-Patil</strong></h3><em>(Assistant Doctor)</em></p>
        </div>
        <ul className="nav-links" style={{ listStyle: "none", padding: 10 }}>

          <li>
            <NavLink to="/">

            </NavLink>
          </li>
          <li>
            <NavLink to="/assistance_doctor_home/adashboard">
              <FaUserMd /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/assistance_doctor_home/patientDetails">
              <FaUserPlus /> Add Patient
            </NavLink>
          </li>
          <li>
            <NavLink to="/assistance_doctor_home/appointment">
              <FaCalendarAlt /> Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/assistance_doctor_home/updatepatient">
              <FaEdit /> Update Patient
            </NavLink>
          </li>
        </ul>
        <button onClick={logout} className="logout-btn2">
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* Main Content */}

      <main className="main-content">
        <div className="main-box">
          {/* <h1>Welcome to Assistant Doctor Dashboard</h1>
          <p>Manage patients, appointments, and medical records efficiently.</p> */}
          <Routes>
            <Route path="/" element={<div><h1>Welcome ! Welcome ! Pankaj Shetake-Patil</h1></div>} />
            <Route path="/adashboard" element={<Adashboard />} />
            <Route path="/patientDetails" element={<AddPatient />} />
            <Route path="/appointment" element={<View_Appointment />} />
            <Route path="/updatepatient" element={<Update_Patient />} />
          </Routes>

        </div>
      </main>
    </div>
  );
}

export default AssistantDoctor;
