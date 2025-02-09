import React, { useState, useEffect } from "react";
import "../styles/AdminViewAppointments.css";

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    // Fetch appointment data from the backend API
    useEffect(() => {
        fetch("http://localhost:8092/appointments")
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

export default AdminAppointments;
