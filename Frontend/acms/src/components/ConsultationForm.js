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
        prescriptionDate: new Date().toISOString().split("T")[0], // Default to today's date
        dietDetails: "",
        foodRecommendations: "",
        routineRecommendations: "",
        medicines: [{ medicineId: "", dosage: "", duration: "" }],
    });

    // Fetch patients
    useEffect(() => {
        fetch("http://localhost:8090/api/patient/ids")
            .then((response) => response.json())
            .then((data) => setPatients(data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    // Fetch appointments
    useEffect(() => {
        fetch("http://localhost:8090/service2/appointments")
            .then((response) => response.json())
            .then((data) => setAppointments(data))
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    // Fetch medicines
    useEffect(() => {
        fetch("http://localhost:8090/api/Medicine")
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

        // Prepare the data to be sent to the API
        const consultationData = {
            patientId: parseInt(formData.patientId, 10),
            appointmentId: parseInt(formData.appointmentId, 10),
            diagnosis: formData.diagnosis,
            treatmentPlan: formData.treatmentPlan,
            prescriptionDate: formData.prescriptionDate,
            dietDetails: formData.dietDetails,
            foodRecommendations: formData.foodRecommendations,
            routineRecommendations: formData.routineRecommendations,
            medicines: formData.medicines.map((med) => ({
                medicineId: parseInt(med.medicineId, 10),
                dosage: med.dosage,
                duration: med.duration,
            })),
        };

        try {
            const response = await fetch("http://localhost:8090/api/Consult/prescribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(consultationData),
            });

            if (!response.ok) {
                throw new Error("Failed to save consultation");
            }

            const result = await response.json();
            alert("Consultation & Prescription Saved Successfully!");
            console.log("API Response:", result);
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
                        {patients.map((patientId, index) => (
                            <option key={index} value={patientId}>
                                {patientId}
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
                        {appointments.map((appointment) => (
                            <option key={appointment.aid} value={appointment.aid}>
                                {appointment.appId}
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

                {/* Diet Details */}
                <div className="mb-3">
                    <label className="form-label">Diet Details:</label>
                    <textarea
                        name="dietDetails"
                        value={formData.dietDetails}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Food Recommendations */}
                <div className="mb-3">
                    <label className="form-label">Food Recommendations:</label>
                    <textarea
                        name="foodRecommendations"
                        value={formData.foodRecommendations}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Routine Recommendations */}
                <div className="mb-3">
                    <label className="form-label">Routine Recommendations:</label>
                    <textarea
                        name="routineRecommendations"
                        value={formData.routineRecommendations}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
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
                                    {medicines.map((medicine) => (
                                        <option key={medicine.medicineId} value={medicine.medicineId}>
                                            {medicine.name}
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