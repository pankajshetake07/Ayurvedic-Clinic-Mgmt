// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Spinner, Alert, Card, ListGroup } from "react-bootstrap";

// const Treatment = ({ patientId }) => {
//     const [treatmentData, setTreatmentData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     // const [patientId, setPatientId] = useState("");


//     useEffect(() => {
//         const fetchTreatment = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8094/api/Treatment/treatment/${patientId}`
//                 );
//                 setTreatmentData(console.log(response.data));
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to load treatment details.");
//                 setLoading(false);
//             }
//         };

//         fetchTreatment();
//     }, []);

//     if (loading) return <Spinner animation="border" className="d-block mx-auto mt-3" />;
//     if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;
//     if (treatmentData.length === 0)
//         return <Alert variant="info" className="text-center">No treatment records found.</Alert>;

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-success mb-4">Treatment History</h2>
//             {treatmentData.map((treatment, index) => (
//                 <Card key={index} className="mb-4 shadow-sm">
//                     <Card.Body>
//                         <Card.Title className="text-primary">Consultation Details</Card.Title>
//                         <p><strong>Diagnosis:</strong> {treatment.Diagnosis}</p>
//                         <p><strong>Treatment Plan:</strong> {treatment.TreatmentPlan}</p>
//                         <p><strong>Date:</strong> {treatment.ConsultDate}</p>

//                         {treatment.Prescription && (
//                             <>
//                                 <hr />
//                                 <h5 className="text-info">Prescription</h5>
//                                 <p><strong>Date:</strong> {treatment.Prescription.PrescriptionDate}</p>
//                                 <p><strong>Notes:</strong> {treatment.Prescription.Notes || "No notes"}</p>
//                                 <ListGroup>
//                                     {treatment.Prescription.Medicines.map((medicine, i) => (
//                                         <ListGroup.Item key={i}>
//                                             <strong>{medicine.MedicineName}</strong> - {medicine.Dosage}, {medicine.Duration}
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             </>
//                         )}

//                         {treatment.DietPlan && (
//                             <>
//                                 <hr />
//                                 <h5 className="text-success">Diet Plan</h5>
//                                 <p><strong>Diet Details:</strong> {treatment.DietPlan.DietDetails}</p>
//                                 <p><strong>Food Recommendations:</strong> {treatment.DietPlan.FoodRecommendations}</p>
//                                 <p><strong>Routine Recommendations:</strong> {treatment.DietPlan.RoutineRecommendations}</p>
//                             </>
//                         )}
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default Treatment;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Card, ListGroup } from "react-bootstrap";

const Treatment = ({ patientId }) => {
    const [treatmentData, setTreatmentData] = useState([]); // Ensure it's an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTreatment = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8094/api/Treatment/treatment/${patientId}`
                );
                setTreatmentData(response.data || []); // Ensure data is an array
                setLoading(false);
            } catch (err) {
                setError("Failed to load treatment details.");
                setLoading(false);
            }
        };

        fetchTreatment();
    }, [patientId]);

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-3" />;
    if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;
    if (!treatmentData || treatmentData.length === 0)
        return <Alert variant="info" className="text-center">No treatment records found.</Alert>;

    return (
        <div className="container mt-4">
            <h2 className="text-center text-success mb-4">Treatment History</h2>
            {treatmentData.map((treatment, index) => (
                <Card key={index} className="mb-4 shadow-sm">
                    <Card.Body>
                        <Card.Title className="text-primary">Consultation Details</Card.Title>
                        <p><strong>Diagnosis:</strong> {treatment.diagnosis || "N/A"}</p>
                        <p><strong>Treatment Plan:</strong> {treatment.treatmentPlan || "N/A"}</p>
                        <p><strong>Date:</strong> {treatment.consultDate || "N/A"}</p>

                        {treatment.prescription && (
                            <>
                                <hr />
                                <h5 className="text-info">Prescription</h5>
                                <p><strong>Notes:</strong> {treatment.prescription.notes || "No notes"}</p>
                                <ListGroup>
                                    {(treatment.prescription.medicines || []).map((medicine, i) => (
                                        <ListGroup.Item key={i}>
                                            <strong>{medicine.medicineName || "Unknown Medicine"}</strong> -
                                            {medicine.dosage || "N/A"}, {medicine.duration || "N/A"}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
                        )}

                        {treatment.dietPlan && (
                            <>
                                <hr />
                                <h5 className="text-success">Diet Plan</h5>
                                <p><strong>Diet Details:</strong> {treatment.dietPlan.dietDetails || "N/A"}</p>
                                <p><strong>Food Recommendations:</strong> {treatment.dietPlan.foodRecommendations || "N/A"}</p>
                                <p><strong>Routine Recommendations:</strong> {treatment.dietPlan.routineRecommendations || "N/A"}</p>
                            </>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Treatment;

