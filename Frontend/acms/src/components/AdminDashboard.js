// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaUserPlus, FaComments, FaSignOutAlt, FaBars, FaCalendarCheck, FaPills, 
//   FaTrash, FaUserCircle, FaUserShield
// } from "react-icons/fa";
// import { Routes, Route } from "react-router-dom";
// import CreateAccount from "./CreateAccount";
// import AdminDeletePatient from "../components/AdminDeletePatient";
// import AdminViewFeedback from "../components/AdminViewFeedback";
// import AdminViewAppointments from "../components/AdminViewAppointments";
// import AdminDeleteEmployee from "../components/AdminDeleteEmployee";
// import AdminProfile from "./AdminProfile";
// import Logout from "./logout";
// import AdminAddMedicine from "../components/AdminAddMedicine";
// import "../styles/Admin.css";

// // Import Logo
// import Logo from "../images/LogoPrakritiSync.png";  // Adjust the path as needed

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);
//   const [adminName, setAdminName] = useState("userName");

//   useEffect(() => {
//     const storedAdminName = localStorage.getItem("userName") || "Admin";
//     setAdminName(storedAdminName);
//   }, []);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className={`sidebar ${isOpen ? "w-64" : "w-20"} transition-all`}>

//         {/* Admin Profile Section */}
//         <div className="profile">
//           {/* Add Logo Above the Admin Name */}
//           <img src={Logo} alt="PrakritiSync Logo" className="logo" />

//           {isOpen && (
//             <>
//               <h2 style={{color:"black"}}><strong>{adminName}</strong></h2>
//               <p>(System Administrator)</p>
//             </>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav>
//           <ul>
//             <li><NavLink to="/admin_home/createaccount"><FaUserPlus className="icon" /> Create Accounts</NavLink></li>
//             <li><NavLink to="/admin_home/deletepatient"><FaTrash className="icon" /> Delete Patients</NavLink></li>
//             <li><NavLink to="/admin_home/viewfeedback"><FaComments className="icon" /> View Feedback</NavLink></li>
//             <li><NavLink to="/admin_home/viewappointments"><FaCalendarCheck className="icon" /> View Appointments</NavLink></li>
//             <li><NavLink to="/admin_home/deleteemployee"><FaTrash className="icon" /> Delete Employee</NavLink></li>
//             <li><NavLink to="/admin_home/addmedicine"><FaPills className="icon" /> Add Medicine</NavLink></li>
//             <li><NavLink to="/admin_home/profile"><FaUserCircle className="icon" /> Profile</NavLink></li>
//           </ul>
//         </nav>

//         {/* Logout Button */}
//         <div className="sidebar-footer">
//           <Logout />
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="main-content">
//         <div className="main-box">
//           <Routes>
//             <Route path="/createaccount" element={<CreateAccount />} /> 
//             <Route path="/deletepatient" element={<AdminDeletePatient />} /> 
//             <Route path="/viewfeedback" element={<AdminViewFeedback />} />
//             <Route path="/viewappointments" element={<AdminViewAppointments />} />
//             <Route path="/deleteemployee" element={<AdminDeleteEmployee />} />
//             <Route path="/addmedicine" element={<AdminAddMedicine />} />
//             <Route path="/profile" element={<AdminProfile />} />
//           </Routes>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;







import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserPlus, FaComments, FaSignOutAlt, FaCalendarCheck, FaPills,
  FaTrash, FaUserCircle
} from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import AdminDeletePatient from "../components/AdminDeletePatient";
import AdminViewFeedback from "../components/AdminViewFeedback";
import AdminViewAppointments from "../components/AdminViewAppointments";
import AdminDeleteEmployee from "../components/AdminDeleteEmployee";
import AdminProfile from "./AdminProfile";
import Logout from "./logout";
import AdminAddMedicine from "../components/AdminAddMedicine";
import "../styles/Admin.css";

// Import Logo
import Logo from "../images/LogoPrakritiSync.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const storedAdminName = localStorage.getItem("userName") || "Admin";
    setAdminName(storedAdminName);
  }, []);

  return (
    <div className="dashboard-container">

      {/* Header with Logo, Admin Name & NavLinks */}
      <header className="dashboard-header">
        <div className="logo-container">
          <img src={Logo} alt="PrakritiSync Logo" className="logo" />


          <div className="admin-info">
            <h2 className="admin-name">Welcome {adminName}</h2>
            <span className="admin-role">(System Administrator)</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="nav-buttons">
          <NavLink to="/admin_home/createaccount" className="nav-button">
            <FaUserPlus /> Create Accounts
          </NavLink>
          {/* <NavLink to="/admin_home/deletepatient" className="nav-button">
            <FaTrash /> Delete Patients
          </NavLink> */}
          <NavLink to="/admin_home/viewfeedback" className="nav-button">
            <FaComments /> View Feedback
          </NavLink>
          <NavLink to="/admin_home/viewappointments" className="nav-button">
            <FaCalendarCheck /> View Appointments
          </NavLink>
          <NavLink to="/admin_home/deleteemployee" className="nav-button">
            <FaTrash /> Delete Employee
          </NavLink>
          <NavLink to="/admin_home/addmedicine" className="nav-button">
            <FaPills /> Add Medicine
          </NavLink>
          <NavLink to="/admin_home/profile" className="nav-button">
            <FaUserCircle /> Profile
          </NavLink>
        </nav>

        {/* Logout Button */}
        <Logout />
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-box">
          <Routes>
            <Route path="/createaccount" element={<CreateAccount />} />
            {/* <Route path="/deletepatient" element={<AdminDeletePatient />} />  */}
            <Route path="/viewfeedback" element={<AdminViewFeedback />} />
            <Route path="/viewappointments" element={<AdminViewAppointments />} />
            <Route path="/deleteemployee" element={<AdminDeleteEmployee />} />
            <Route path="/addmedicine" element={<AdminAddMedicine />} />
            <Route path="/profile" element={<AdminProfile />} />
          </Routes>
        </div>

      </main>
      {/* <footer className="dashboard-footer">
        <p>@2025 Admin Panel</p>
      </footer> */}
    </div>
  );
}

export default AdminDashboard;
