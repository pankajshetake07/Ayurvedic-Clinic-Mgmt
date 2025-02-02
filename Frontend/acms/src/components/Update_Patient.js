  // import React from "react";

  // const styles = {
  //  textAlign :"center",
  //  marginLeft : " " 
  // }

  // function Update_Patient() {
  //   return <div style={styles}><h1>Update the patients Details </h1></div>;
  // }

  // export default Update_Patient;

  import "../styles/Update_Patient.css";
  import { useState, useEffect } from "react";

  export default function Update_Patient() {
    const [patient, setPatient] = useState({
      pid:"",
      uname: "",
      password: "",
      fname: "",
      lname: "",
      dob: "",
      address: "",
      gender: "",
      mail: "",
      app_date: "",
      app_time: "",
      history: ""
    });

    useEffect(() => {
      // Fetch patient details from API
      fetch("https://api.example.com/patient/1") // Replace with actual API endpoint
        .then((response) => response.json())
        .then((data) => setPatient(data))
        .catch((error) => console.error("Error fetching patient details:", error));
    }, []);

    const handleChange = (e) => {
      setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Send updated data to API
      fetch("https://api.example.com/updatePatient/1", { // Replace with actual API endpoint
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Patient details updated successfully!");
        console.log("Updated data:", data);
      })
      .catch((error) => console.error("Error updating patient details:", error));
    };

    return (
      <div className="container">
        <br></br>
        <h1 id="up">Update Patient</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit} id="fupdate">
        <div className="mb-3">
            <label className="form-label">Patient Id:</label>
            <input type="number" className="form-control" name="pid" value={patient.pid} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" className="form-control" name="uname" value={patient.uname} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" name="password" value={patient.password} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input type="text" className="form-control" name="fname" value={patient.fname} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input type="text" className="form-control" name="lname" value={patient.lname} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input type="date" className="form-control" name="dob" value={patient.dob} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input type="text" className="form-control" name="address" value={patient.address} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <input type="text" className="form-control" name="gender" value={patient.gender} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Mail ID:</label>
            <input type="text" className="form-control" name="mail" value={patient.mail} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Appointment Date:</label>
            <input type="date" className="form-control" name="app_date" value={patient.app_date} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Appointment Time:</label>
            <input type="time" className="form-control" name="app_time" value={patient.app_time} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Previous History:</label>
            <textarea className="form-control" name="history" rows="4" value={patient.history} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" id="update">Update</button>
        </form>
      </div>
    );
  }
