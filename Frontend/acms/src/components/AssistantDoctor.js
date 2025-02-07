import React from "react";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FaUserMd, FaUserPlus, FaCalendarAlt, FaEdit, FaSignOutAlt } from "react-icons/fa";
import Adashboard from "./DashBoard"
import AddPatient from "./AddPatient"
import View_Appointment from "./View_Appointments"
import Update_Patient from "./Update_Patient"
import "../styles/AssistantDoctor.css"; // Import the CSS file
import { useEffect ,useState} from "react";
import Logout from "./logout";
import logo from "../images/LogoPrakritiSync.png"; 
const logout = () => {
  if (window.confirm("Do you want to logout?")) {
    console.log("Logged out");

  }
};

function AssistantDoctor() {

  const [assDoctorName, setAdminName] = useState("Assistant Doctor");
  
    useEffect(() => {
      const storedAssitantName = localStorage.getItem("userName") || "Admin";
      setAdminName(storedAssitantName);
    }, []);
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="top-navbar">
      <div className="logo-container">
          <img src={logo} alt="PrakritiSync Logo" className="logo" />
        </div>
        <div>
        <h2 className="assDoctor-name">Welcome {assDoctorName}</h2>
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
        {/* <button onClick={logout} className="logout-btn2">
          <FaSignOutAlt /> Logout
        </button> */}
        <Logout/>
      </nav>

      {/* Main Content */}

      <main className="main-content">
        <div className="main-box">
          {/* <h1>Welcome to Assistant Doctor Dashboard</h1>
          <p>Manage patients, appointments, and medical records efficiently.</p> */}
          <Routes>
            <Route path="/" element={<div style={{marginTop:"100px",textAlign:"center"}}><h1>Welcome ! Welcome ! {assDoctorName}</h1></div>} />
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
