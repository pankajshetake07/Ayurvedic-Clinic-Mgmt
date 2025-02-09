import React, { useState, useEffect } from "react";
import { FaUser, FaCalendar, FaTimes, FaFilePrescription } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../images/LogoPrakritiSync.png'
import Logout from "./logout";
import ConsultationForm from "./ConsultationForm";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [doctorName, setDoctorName] = useState("Doctor");

  useEffect(() => {
    const storedDoctorName = localStorage.getItem("userName") || "Doctor";
    setDoctorName(storedDoctorName);
  }, []);

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 d-flex flex-column align-items-center p-4 shadow"
          style={{
            background: "linear-gradient(135deg, #2c3e50, #34495e)",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          {/* Logo */}
          <img src={Logo} alt="PrakritiSync Logo" height={150} width={200} />

          <h3 className="text-center text-white mb-5 fw-bold">
            Welcome {doctorName}
          </h3>

          <ul className="nav flex-column w-100">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item mb-4">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-link text-white d-flex align-items-center gap-3 p-3 w-100 rounded shadow 
                    ${activeTab === item.id ? "active-menu bg-dark" : ""}`}
                  style={{
                    fontSize: "1.2rem",
                    transition: "background 0.3s ease",
                  }}
                >
                  {item.icon} {item.label}
                </button>
              </li>
            ))}
          </ul>
          <Logout />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4 bg-light">
          <h1 className="fw-bold text-primary">Doctor Dashboard</h1>
          <div className="bg-white p-4 rounded shadow">{getTabContent(activeTab)}</div>
        </div>
      </div>
    </div>
  );
};

// Render Active Tab Content
const getTabContent = (activeTab) => {
  switch (activeTab) {
    case "Appointments":
      return <Appointments />;
    case "Patients":
      return <Patients />;
    case "Prescriptions":
      return <ConsultationForm />;
    default:
      return null;
  }
};

// Patients Component
const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8092/getAllPatients")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  return (
    <div>
      <h2 className="text-success">Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>DOB</th>
              <th>Address</th>

              <th>Gender</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((user) => (
              <tr key={user.uid} style={{ backgroundColor: "#d4edda" }}>
                <td>{user.uname}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.dob}</td>
                <td>{user.address}</td>

                <td>{user.gender}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Appointments Component
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8092/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
    console.log(appointments);
  }, []);

  return (
    <div>
      <h2 className="text-success">Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} style={{ backgroundColor: "#d4edda" }}>
                <td>{appointment.appDate}</td>
                <td>{appointment.appTime}</td>
                <td>{appointment.fname}</td>
                <td>{appointment.lname}</td>
                <td>{appointment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


// Sidebar Menu Items
const menuItems = [
  { id: "Appointments", label: "Appointments", icon: <FaUser /> },
  { id: "Patients", label: "Patients", icon: <FaCalendar /> },
  { id: "Prescriptions", label: "Prescriptions", icon: <FaFilePrescription /> },
];

export default DoctorDashboard;
