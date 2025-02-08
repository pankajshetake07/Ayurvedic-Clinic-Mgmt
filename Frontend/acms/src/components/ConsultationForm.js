import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
        // Fetch patients, appointments, and medicines using fetch API
        fetch("https://localhost:7262/api/patient/ids")
            .then((response) => response.json())
            .then((data) => setPatients(data))
            .catch((error) => console.error("Error fetching patients:", error));
        console.log("Patients: ", patients);
        fetch("/api/appointments")
            .then((response) => response.json())
            .then((data) => setAppointments(data))
            .catch((error) => console.error("Error fetching appointments:", error));

        fetch("https://localhost:7262/api/medicines")
            .then((response) => response.json())
            .then((data) => setMedicines(data))
            .catch((error) => console.error("Error fetching medicines:", error));
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
            const response = await fetch("/api/consult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to save consultation");
            }

            alert("Consultation & Prescription Saved Successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Error submitting form");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Doctor Consultation & Prescription</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
                {/* Select Patient */}
                <div className="mb-3">
                    <label className="form-label">Patient:</label>
                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Patient</option>
                        {patients.map((p) => (
                            <option key={p.patientId} value={p.patientId}>
                                {p.name} (ID: {p.patientId})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Appointment */}
                <div className="mb-3">
                    <label className="form-label">Appointment:</label>
                    <select
                        name="appointmentId"
                        value={formData.appointmentId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Appointment</option>
                        {appointments.map((a) => (
                            <option key={a.aid} value={a.aid}>
                                {a.app_date} - {a.app_time}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Diagnosis */}
                <div className="mb-3">
                    <label className="form-label">Diagnosis:</label>
                    <input
                        type="text"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Treatment Plan */}
                <div className="mb-3">
                    <label className="form-label">Treatment Plan:</label>
                    <textarea
                        name="treatmentPlan"
                        value={formData.treatmentPlan}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Prescription Notes */}
                <div className="mb-3">
                    <label className="form-label">Prescription Notes:</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                    ></textarea>
                </div>

                {/* Medicines */}
                <h3 className="mt-4 mb-3">Prescribed Medicines</h3>
                {formData.medicines.map((med, index) => (
                    <div key={index} className="medicine-group mb-3 border p-3 rounded">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <select
                                    value={med.medicineId}
                                    onChange={(e) => handleMedicineChange(index, "medicineId", e.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Medicine</option>
                                    {medicines.map((m) => (
                                        <option key={m.medicineId} value={m.medicineId}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Dosage (e.g., 1 tablet twice a day)"
                                    value={med.dosage}
                                    onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    placeholder="Duration (e.g., 7 days)"
                                    value={med.duration}
                                    onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                                <button
                                    type="button"
                                    onClick={() => removeMedicine(index)}
                                    className="btn btn-danger w-100"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Medicine Button */}
                <div className="mb-3">
                    <button
                        type="button"
                        onClick={addMedicine}
                        className="btn btn-secondary w-100"
                    >
                        + Add Medicine
                    </button>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-50">
                        Save Consultation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConsultationForm;