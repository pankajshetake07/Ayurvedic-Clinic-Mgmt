import React, { useState, useEffect } from 'react';
import '../styles/PatientDashboard.css';
import Logout from './logout';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8081/xyz';

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('appointments');
    const [userName, setUserName] = useState("");
    const [profile, setProfile] = useState({ email: '', phone: '' });
    const [treatments, setTreatments] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const navigate = useNavigate();

    // Check login status
    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (!storedName) {
            navigate("/login");  // Redirect to login if user is not logged in
        } else {
            setUserName(storedName);
        }
    }, [navigate]);

    // Fetch treatments
    useEffect(() => {
        fetch(`${API_BASE}/treatments`)
            .then((res) => res.json())
            .then((data) => setTreatments(data))
            .catch((err) => console.error('Error fetching treatments:', err));
    }, []);

    // Fetch available slots when date is selected
    useEffect(() => {
        if (!selectedDate) return;  // Prevent fetch if no date is selected

        fetch(`http://localhost:8081/appointments/available-slots?appDate=${selectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Available Slots:", data);  // Log the response
                setAvailableSlots(data);  // Update the availableSlots state
            })
            .catch((err) => console.error('Error fetching available slots:', err));
    }, [selectedDate]);   // Only fetch when selectedDate changes

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        console.log("Selected Date:", date);  // Log the selected date
    };


    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !feedback) {
            alert("Please select a date and provide feedback.");
            return;
        }
        const patientId = localStorage.getItem("patientId");
        alert(patientId)
        if (!patientId) {
            alert("Patient not found. Please log in again.");
            navigate("/login");
            return;
        }
        const formData = {
            patientId: patientId,
            appDate: selectedDate,
            appTime: feedback,
        };
        fetch(`http://localhost:8081/appointments/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => console.log(res.json()))
            .then((data) => {
                console.log('Appointment booked:', data);
                setBookingSuccess(true);
            })
            .catch((err) => console.error('Error booking appointment:', err));
    };

    return (
        <div className="patient-dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>PrakritiSync</h2>
                </div>
                <nav className="sidebar-nav">
                    <a href="#appointments" className={activeTab === 'appointments' ? 'active' : ''} onClick={() => setActiveTab('appointments')}>Appointments</a>
                    <a href="#profile" className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</a>
                    <a href="#treatments" className={activeTab === 'treatments' ? 'active' : ''} onClick={() => setActiveTab('treatments')}>Treatments</a>
                    <a href="#feedback" className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>Feedback</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="user-info">
                        <span>Welcome, {userName}</span>
                        <Logout />
                    </div>
                </header>
                <div className="dashboard-content">

                    {/* ✅ Appointment Section */}
                    {activeTab === 'appointments' && (
                        <div id="appoitment" className="dashboard-card">
                            <h2>Book an Appointment</h2>
                            <form onSubmit={handleAppointmentSubmit}>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="appointment-time">Select Time Slot</label>
                                    <select
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a time</option>
                                        {availableSlots.length > 0 ? (
                                            availableSlots.map((slot) => (
                                                <option key={slot.id} value={slot.slotTime}>
                                                    {slot.slotTime}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No slots available</option>
                                        )}
                                    </select>
                                </div>

                                <button type="submit">Book Appointment</button>
                                {bookingSuccess && <p className="success-message">✅ Appointment booked successfully!</p>}
                            </form>
                        </div>
                    )}

                    {/* ✅ Treatments Section */}
                    {activeTab === 'treatments' && (
                        <div className="dashboard-card">
                            <h2>Your Treatments & Medicines</h2>
                            {treatments.length > 0 ? (
                                treatments.map((treatment, index) => (
                                    <div className="medical-record" key={index}>
                                        <h3>{treatment.name}</h3>
                                        <p>{treatment.details}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No treatments available.</p>
                            )}
                        </div>
                    )}

                    {/* ✅ Feedback Section */}
                    {activeTab === 'feedback' && (
                        <div className="dashboard-card">
                            <h2>Give Feedback</h2>
                            <form>
                                <div className="form-group">
                                    <label>Your Feedback</label>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Submit Feedback</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PatientDashboard;
