import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsultationForm = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [formData, setFormData] = useState({
        patientId: "",
        appointmentId: "",
        diagnosis: "",
        treatmentPlan: "",
        prescriptionDate: new Date().toISOString().split("T")[0],
        notes: "",
        medicines: [{ medicineId: "", dosage: "", duration: "" }],
    });

    useEffect(() => {
        // Fetch patients, appointments, and medicines from API
        axios.get("/api/patients").then((res) => setPatients(res.data));
        axios.get("/api/appointments").then((res) => setAppointments(res.data));
        axios.get("/api/medicines").then((res) => setMedicines(res.data));
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle medicine changes
    const handleMedicineChange = (index, field, value) => {
        const updatedMedicines = [...formData.medicines];
        updatedMedicines[index][field] = value;
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Add another medicine field
    const addMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { medicineId: "", dosage: "", duration: "" }],
        });
    };

    // Remove a medicine field
    const removeMedicine = (index) => {
        const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/consult", formData);
            alert("Consultation & Prescription Saved Successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Error submitting form");
        }
    };

    return (
        <div className="container">
            <h2>Doctor Consultation & Prescription</h2>
            <form onSubmit={handleSubmit}>
                {/* Select Patient */}
                <label>Patient:</label>
                <select name="patientId" value={formData.patientId} onChange={handleChange} required>
                    <option value="">Select Patient</option>
                    {patients.map((p) => (
                        <option key={p.patientId} value={p.patientId}>
                            {p.name} (ID: {p.patientId})
                        </option>
                    ))}
                </select>

                {/* Select Appointment */}
                <label>Appointment:</label>
                <select name="appointmentId" value={formData.appointmentId} onChange={handleChange} required>
                    <option value="">Select Appointment</option>
                    {appointments.map((a) => (
                        <option key={a.aid} value={a.aid}>
                            {a.app_date} - {a.app_time}
                        </option>
                    ))}
                </select>

                {/* Diagnosis */}
                <label>Diagnosis:</label>
                <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />

                {/* Treatment Plan */}
                <label>Treatment Plan:</label>
                <textarea name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} required></textarea>

                {/* Prescription Notes */}
                <label>Prescription Notes:</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>

                {/* Medicines */}
                <h3>Prescribed Medicines</h3>
                {formData.medicines.map((med, index) => (
                    <div key={index} className="medicine-group">
                        <select value={med.medicineId} onChange={(e) => handleMedicineChange(index, "medicineId", e.target.value)} required>
                            <option value="">Select Medicine</option>
                            {medicines.map((m) => (
                                <option key={m.medicineId} value={m.medicineId}>
                                    {m.name}
                                </option>
                            ))}
                        </select>

                        <input type="text" placeholder="Dosage (e.g., 1 tablet twice a day)" value={med.dosage} onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)} required />

                        <input type="text" placeholder="Duration (e.g., 7 days)" value={med.duration} onChange={(e) => handleMedicineChange(index, "duration", e.target.value)} required />

                        <button type="button" onClick={() => removeMedicine(index)}>Remove</button>
                    </div>
                ))}

                {/* Add Medicine Button */}
                <button type="button" onClick={addMedicine}>+ Add Medicine</button>

                {/* Submit Button */}
                <button type="submit">Save Consultation</button>
            </form>
        </div>
    );
};

export default ConsultationForm;
