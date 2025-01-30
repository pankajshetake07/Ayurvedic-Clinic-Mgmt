
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientDashboard = () => {
    return (
        <div className="container-fluid bg-light min-vh-100">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
                <a className="navbar-brand" href="#">Patient Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#appointments">Appointments</a></li>
                        <li className="nav-item"><a className="nav-link" href="#medicines">Prescriptions</a></li>
                        <li className="nav-item"><a className="nav-link" href="#reports">Health Reports</a></li>
                        <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>
                        <li className="nav-item"><a className="nav-link btn btn-danger text-white" href="#logout">Logout</a></li>
                    </ul>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="container mt-4">
                <div className="row">
                    {/* Appointments Section */}
                    <div className="col-md-6 mb-4" id="appointments">
                        <div className="card shadow p-3">
                            <h5 className="card-title">Upcoming Appointments</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Dr. Smith - 12th Feb, 10:00 AM</li>
                                <li className="list-group-item">Dr. Johnson - 15th Feb, 2:00 PM</li>
                            </ul>
                        </div>
                    </div>

                    {/* Prescriptions Section */}
                    <div className="col-md-6 mb-4" id="medicines">
                        <div className="card shadow p-3">
                            <h5 className="card-title">Prescribed Medicines</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Paracetamol - 3 times a day</li>
                                <li className="list-group-item">Amoxicillin - After meals</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Health Reports Section */}
                    <div className="col-md-6 mb-4" id="reports">
                        <div className="card shadow p-3">
                            <h5 className="card-title">Health Reports & Records</h5>
                            <button className="btn btn-primary">View Reports</button>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="col-md-6 mb-4" id="profile">
                        <div className="card shadow p-3">
                            <h5 className="card-title">Profile & Settings</h5>
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Age:</strong> 29</p>
                            <p><strong>Contact:</strong> johndoe@example.com</p>
                            <button className="btn btn-warning">Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;