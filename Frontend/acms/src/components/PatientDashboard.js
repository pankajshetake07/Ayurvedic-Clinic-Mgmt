import React, { useState, useEffect } from 'react';
import '../styles/PatientDashboard.css';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8081';

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('appointments');
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState({ email: '', phone: '' });
    const [treatments, setTreatments] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    const navigate = useNavigate();

    // Check login status
    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (!storedName) {
            navigate("/login");
        } else {
            setUserName(storedName);
        }
    }, [navigate]);

    useEffect(() => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const currentTimeFormatted = `${hours}:${minutes}`;

        setSelectedTime(currentTimeFormatted);  // Set the current time as default

        console.log("Current Time Set:", currentTimeFormatted);
    }, []);

    // Fetch treatments
    useEffect(() => {
        fetch(`${API_BASE}/treatments`)
            .then((res) => res.json())
            .then((data) => setTreatments(data))
            .catch((err) => console.error('Error fetching treatments:', err));
    }, []);

    // Fetch available slots when date is selected
    useEffect(() => {
        if (!selectedDate) return;

        fetch(`http://localhost:8081/appointments/available-slots?appDate=${selectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Available Slots:", data);
                setAvailableSlots(data);
            })
            .catch((err) => console.error('Error fetching available slots:', err));
    }, [selectedDate]);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        console.log("Selected Date:", date);
    };

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId"); // Ensure correct key
        const slotId = selectedSlot; // Ensure it's not null
        const appDate = selectedDate;
        const appTime = selectedTime;

        console.log("Sending Booking Request:");
        console.log("User ID:", userId);
        console.log("Slot ID:", slotId);
        console.log("Appointment Date:", appDate);
        console.log("Appointment Time:", appTime)

        if (!userId || !slotId || !appDate || !appTime) {
            alert("Please select a valid date and slot before booking.");
            return;
        }

        const formData = { userId, slotId, appDate, appTime };
        console.log("hello")
        fetch(`http://localhost:8081/appointments/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }
                return res.json();
            })
            .then((data) => {
                console.log('✅ Appointment booked:', data);
                setBookingSuccess(true);
            })
            .catch((err) => {
                console.error('❌ Error booking appointment:', err.message);
                alert(`Error: ${err.message}`);
            });
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
                        <div id="appointment" className="dashboard-card">
                            <h2>Book an Appointment</h2>
                            <form onSubmit={handleAppointmentSubmit}>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" value={selectedDate} onChange={handleDateChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Select Time Slot</label>
                                    <select value={selectedSlot || ''} onChange={(e) => setSelectedSlot(e.target.value)} required>
                                        <option value="">Select a slot</option>
                                        {availableSlots.length > 0 ? (
                                            availableSlots.map((slot) => (
                                                <option key={slot.id} value={slot.id}>
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
                                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
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
