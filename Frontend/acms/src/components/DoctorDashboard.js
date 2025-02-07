import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatmentPlan: "",
    dietDetails: "",
    foodRecommendations: "",
    routineRecommendations: "",
    medicines: [{ medicineId: "", dosage: "", duration: "" }],
  });
  const [activeSection, setActiveSection] = useState("appointments");

  useEffect(() => {
    axios.get("https://localhost:7262/api/GetMedicine/GetAllMedicines")
      .then(response => setMedicines(response.data))
      .catch(error => console.error("Error fetching medicines:", error));

    axios.get("http://localhost:8091/appointments/booked")
      .then(response => setAppointments(response.data))
      .catch(error => console.error("Error fetching appointments:", error));

    axios.get("/api/doctor/profile")
      .then(response => setDoctorProfile(response.data))
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle medicine selection
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
    if (!selectedAppointment) {
      alert("Please select an appointment.");
      return;
    }

    try {
      const requestData = {
        appointmentId: selectedAppointment,
        ...formData,
      };

      await axios.post("/api/consult", requestData);
      alert("Consultation & Prescription Saved Successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="list-group me-4" style={{ width: "250px" }}>
        <button className="list-group-item list-group-item-action" onClick={() => setActiveSection("appointments")}>
          View All Booked Appointments
        </button>
        <button className="list-group-item list-group-item-action" onClick={() => setActiveSection("consult")}>
          Consult Patient
        </button>
        <button className="list-group-item list-group-item-action" onClick={() => setActiveSection("profile")}>
          Doctor Profile
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {activeSection === "appointments" && (
          <div className="card mb-4">
            <div className="card-header">Booked Appointments</div>
            <div className="card-body">
              <ul className="list-group">
                {appointments.map((appointment) => (
                  <li key={appointment.pid} className="list-group-item">
                    {appointment.pid} - {appointment.patientName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSection === "consult" && (
          <div className="card mb-4">
            <div className="card-header">Consult Patient</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Select Appointment */}
                <div className="mb-3">
                  <label className="form-label">Select Appointment</label>
                  <select className="form-select" onChange={(e) => setSelectedAppointment(e.target.value)} required>
                    <option value="">Select Appointment</option>
                    {appointments.map((a) => (
                      <option key={a.aid} value={a.aid}>
                        {a.app_date} - {a.app_time} (Patient ID: {a.pid})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Diagnosis */}
                <div className="mb-3">
                  <textarea className="form-control" name="diagnosis" placeholder="Diagnosis" onChange={handleChange} required />
                </div>

                {/* Treatment Plan */}
                <div className="mb-3">
                  <textarea className="form-control" name="treatmentPlan" placeholder="Treatment Plan" onChange={handleChange} required />
                </div>

                {/* Diet Plan */}
                <div className="mb-3">
                  <textarea className="form-control" name="dietDetails" placeholder="Diet Details" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="foodRecommendations" placeholder="Food Recommendations" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="routineRecommendations" placeholder="Routine Recommendations" onChange={handleChange} />
                </div>

                {/* Medicines Section */}
                <h5>Prescribed Medicines</h5>
                {formData.medicines.map((med, index) => (
                  <div key={index} className="mb-3 d-flex gap-2">
                    <select className="form-select" value={med.medicineId} onChange={(e) => handleMedicineChange(index, "medicineId", e.target.value)} required>
                      <option value="">Select Medicine</option>
                      {medicines.map((m) => (
                        <option key={m.medicineId} value={m.medicineId}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <input type="text" className="form-control" placeholder="Dosage (e.g., 1 tablet twice a day)" value={med.dosage} onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)} required />
                    <input type="text" className="form-control" placeholder="Duration (e.g., 7 days)" value={med.duration} onChange={(e) => handleMedicineChange(index, "duration", e.target.value)} required />
                    <button type="button" className="btn btn-danger" onClick={() => removeMedicine(index)}>X</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={addMedicine}>+ Add Medicine</button>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Save Consultation</button>
              </form>
            </div>
          </div>
        )}

        {activeSection === "profile" && doctorProfile && (
          <div className="card">
            <div className="card-header">Doctor Profile</div>
            <div className="card-body">
              <p><strong>Full Name:</strong> {doctorProfile.fname} {doctorProfile.lname}</p>
              <p><strong>Email:</strong> {doctorProfile.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
