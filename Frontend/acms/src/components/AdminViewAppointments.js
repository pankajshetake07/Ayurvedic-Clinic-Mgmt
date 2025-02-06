import React, { useState, useEffect } from "react";
import "../styles/AdminViewAppointments.css"

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    // Fetch appointment data from the backend API
   useEffect(() => {
    fetch("http://localhost:8081/appointments/getAllAppointments")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched appointment data:", JSON.stringify(data, null, 2)); // Debugging log
            setAppointments(data);
        })
        .catch((error) => console.error("Error fetching appointment data:", error));
}, []);


    return (
        <div className="admin-appointments-container">
            <h2 className="admin-appointments-title">Appointments</h2>
            <div className="appointments-table-wrapper">
                <table className="appointments-table">
                    <thead>
                        <tr>
                            {/* <th>Appointment ID</th> */}
                            <th>Patient Name</th>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            
                            <tr key={appointment.aid}>
                                {/* <td>{appointment.aid}</td> */}
                                <td>{appointment.patient.fname}</td>
                                <td>{appointment.appDate}</td>
                                <td>{appointment.appTime}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAppointments;
