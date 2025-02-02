import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import '../src/styles/style.css';
import 'font-awesome/css/font-awesome.min.css';
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
// import AssistantDoctorHome from "./components/AssistantDoctorHome";
import AssistantDoctor from "./components/AssistantDoctor";
import ReceptionistHome from "./components/receptionistHome";
import { useSelector } from "react-redux";
import Logout from "./components/Logout";
import Register from './components/Register'
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminEmployeeDashboard from "./components/AdminEmployeeDashboard";

function App() {
  const logged = useSelector((state) => state.logged.loggedIn); // Redux state for login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("roleId");
    if (logged || storedRole) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [logged]);

  return (
    <div className="App">
      {/* Hide Navigation Bar if logged in */}
      {!isLoggedIn && (
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
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin_home" element={<AdminEmployeeDashboard />} />
        <Route path="/doctor_home" element={<DoctorDashboard />} />
        <Route path="/patient_home" element={<PatientDashboard />} />
        <Route path="/assistance_doctor_home/*" element={<AssistantDoctor />} />
        <Route path="/receptionist_home" element={<ReceptionistHome />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

// Styles for the navigation bar
const styles = {
  navBar: { backgroundColor: "#333", padding: "10px" },
  navList: { display: "flex", justifyContent: "space-around", listStyleType: "none", margin: 0, padding: 0 },
  navLink: { color: "white", textDecoration: "none", padding: "10px 20px", fontSize: "16px" },
};

export default App;
