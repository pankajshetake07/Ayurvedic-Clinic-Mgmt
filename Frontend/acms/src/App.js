import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import '../src/styles/style.css';
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import AssistantDoctorHome from "./components/AssistantDoctorHome";
import ReceptionistHome from "./components/receptionistHome";
import { useSelector } from "react-redux";
import Logout from "./components/logout";
import Register from './components/Register'
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";


function App() {

  //initial state of logged
  const myState = useSelector((state) => state.logged)


  return (
    <div className="App">
      <div style={{ display: myState.loggedIn ? "none" : "block" }}>
        {/* Navigation Bar */}
        <nav style={styles.navBar}>
          <ul style={styles.navList}>
            <li><Link to="/" style={styles.navLink}>Home</Link></li>
            <li><Link to="/about" style={styles.navLink}>About Us</Link></li>
            <li><Link to="/services" style={styles.navLink}>Services</Link></li>
            <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
            <li><Link to="/login" style={styles.navLink}>Login</Link></li>
            <li><Link to="/register" style={styles.navLink}>Register</Link></li>
          </ul>
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/register" element={<Register />} />
        <Route path="admin_home" element={<AdminHome />} />
        <Route path="doctor_home" element={<DoctorDashboard />} />
        <Route path="patient_home" element={<PatientDashboard />} / >
        <Route path="assistance_doctor_home" element={<AssistantDoctorHome />} />
        <Route path="receptionist_home" element={<ReceptionistHome />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div >
  );
};

// Styles for the navigation bar
const styles = {
  navBar: {
    backgroundColor: "#333",
    padding: "10px",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default App;
