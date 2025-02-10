// import React from "react";

// const styles = {
//  textAlign :"center",
//  marginLeft : " " 
// }

// function Update_Patient() {
//   return <div style={styles}><h1>Update the patients Details </h1></div>;
// }

// export default Update_Patient;

// import "../styles/Update_Patient.css";
// import { useState, useEffect } from "react";

// export default function Update_Patient() {

//   const [patient, setPatient] = useState({
//     pid:"",
//     uname: "",
//     password: "",
//     fname: "",
//     lname: "",
//     dob: "",
//     address: "",
//     gender: "",
//     mail: "",
//     app_date: "",
//     app_time: "",
//     history: ""
//   });

//   useEffect(() => {
//     // Fetch patient details from API
//     fetch(`https://localhost:8081/patient/by-id/${pid}`) // Replace with actual API endpoint
//       .then((response) => response.json())
//       .then((data) => setPatient(data))
//       .catch((error) => console.error("Error fetching patient details:", error));
//   }, []);

//   const handleChange = (e) => {
//     setPatient({ ...patient, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Send updated data to API
//     fetch(`https://localhost:8081/update/${uid}`, { // Replace with actual API endpoint
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(patient),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       alert("Patient details updated successfully!");
//       console.log("Updated data:", data);
//     })
//     .catch((error) => console.error("Error updating patient details:", error));
//   };

//   return (
//     <div className="container">
//       <br></br>
//       <h1 id="up">Update Patient</h1>
//       <br></br>
//       <br></br>
//       <form onSubmit={handleSubmit} id="fupdate">
//       <div className="mb-3">
//           <label className="form-label">Patient Id:</label>
//           <input type="number" className="form-control" name="pid" value={patient.pid} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Username:</label>
//           <input type="text" className="form-control" name="uname" value={patient.uname} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password:</label>
//           <input type="password" className="form-control" name="password" value={patient.password} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">First Name:</label>
//           <input type="text" className="form-control" name="fname" value={patient.fname} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Last Name:</label>
//           <input type="text" className="form-control" name="lname" value={patient.lname} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Date of Birth:</label>
//           <input type="date" className="form-control" name="dob" value={patient.dob} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Address:</label>
//           <input type="text" className="form-control" name="address" value={patient.address} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Gender:</label>
//           <input type="text" className="form-control" name="gender" value={patient.gender} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Mail ID:</label>
//           <input type="text" className="form-control" name="mail" value={patient.mail} onChange={handleChange} />
//         </div>

//         {/* <div className="mb-3">
//           <label className="form-label">Appointment Date:</label>
//           <input type="date" className="form-control" name="app_date" value={patient.app_date} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Appointment Time:</label>
//           <input type="time" className="form-control" name="app_time" value={patient.app_time} onChange={handleChange} />
//         </div> */}

//         <div className="mb-3">
//           <label className="form-label">Previous History:</label>
//           <textarea className="form-control" name="history" rows="4" value={patient.history} onChange={handleChange}></textarea>
//         </div>

//         <button type="submit" className="btn btn-primary" id="update">Update</button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import "../styles/Update_Patient.css";

const UpdatePatient = () => {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPatientDetails = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get(`http://localhost:8090/service2/patient/by-id/${patientId}`);
      console.log("Fetched Data:", response.data);
      setPatientData(response.data);
    } catch (error) {
      setMessage("Error fetching patient details. Please try again.");
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const updatedPatientData = {
        ...patientData,
        user: {
          ...patientData.user,
        },
      };
      console.log("Updated Data Sent:", updatedPatientData);

      await axios.put(`http://localhost:8090/service2/update/${patientId}`, updatedPatientData);
      setMessage("Patient details updated successfully!");
    } catch (error) {
      setMessage("Error updating patient details. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="put_patient">
      <h2>Update Patient Details</h2>
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={fetchPatientDetails} disabled={loading}>Fetch Details</button>
      {message && <p>{message}</p>}

      {patientData && patientData.user && (
        <div className="put_patient_form">
          <label className="update_label">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={patientData.user.uname || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, uname: e.target.value }
            })}
          />

          <label className="update_label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={patientData.user.password || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, password: e.target.value }
            })}
          />

          <label className="update_label">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={patientData.user.fname || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, fname: e.target.value }
            })}
          />

          <label className="update_label">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={patientData.user.lname || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, lname: e.target.value }
            })}
          />

          <label className="update_label">E-Mail</label>
          <input
            type="email"
            placeholder="Email"
            value={patientData.user.email || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, email: e.target.value }
            })}
          />

          <label className="update_label">Date Of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={patientData.user.dob || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, dob: e.target.value }
            })}
          />

          <label className="update_label">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={patientData.user.address || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, address: e.target.value }
            })}
          />

          <label className="update_label">Gender</label>
          <select
            value={patientData.user.gender || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              user: { ...patientData.user, gender: e.target.value }
            })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="update_label">Previous History</label>
          <textarea
            placeholder="Previous History"
            value={patientData.previous_history || ""}
            onChange={(e) => setPatientData({
              ...patientData,
              previous_history: e.target.value
            })}
          />

          <button onClick={handleUpdate} disabled={loading}>Update Patient</button>
        </div>
      )}
    </div>
  );
};

export default UpdatePatient;
