import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8090/service2';

const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');


    // Fetch available slots when date is selected
    useEffect(() => {
        if (!selectedDate) return;

        fetch(`${API_BASE}/appointments/available-slots?appDate=${selectedDate}`)
            .then(res => res.json())
            .then(data => setAvailableSlots(data))
            .catch(err => console.error('Error fetching slots:', err));
    }, [selectedDate]);

    useEffect(() => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const currentTimeFormatted = `${hours}:${minutes}`;

        setSelectedTime(currentTimeFormatted);  // Set the current time as default

        console.log("Current Time Set:", currentTimeFormatted);
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const appTime = selectedTime;

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        if (!userId || !selectedSlot || !selectedDate || !selectedTime) {
            alert("Please select a date and slot before booking.");
            return;
        }

        fetch(`${API_BASE}/appointments/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, slotId: selectedSlot, appDate: selectedDate, appTime })
        })
            .then(async (res) => {
                const responseData = await res.json(); // Parse response
                if (!res.ok) {
                    throw new Error(responseData.message || 'Failed to book appointment');
                }
                return responseData;
            })
            .then(() => {
                setBookingSuccess(true);
                alert('Appointment booked successfully!');
            })
            .catch(err => {
                console.error('Error booking appointment:', err.message);

                // Handle specific error messages
                if (err.message.includes('already have an appointment')) {
                    alert('You have already booked an appointment for this date. Please choose another day.');
                } else if (err.message.includes('Slot is already booked')) {
                    alert('The selected slot is already booked. Please pick another available time.');
                } else {
                    alert('Failed to book the appointment. Please try again later.');
                }
            });

    };

    return (
        <div className="dashboard-card">
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
    );
};

export default Appointments;
