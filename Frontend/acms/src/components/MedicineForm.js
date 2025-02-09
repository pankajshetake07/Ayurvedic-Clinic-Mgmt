import React, { useEffect, useState } from "react";

const MedicineForm = () => {
    const [medicineForms, setMedicineForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:8094/api/MedicineForm/getAll")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch medicine forms");
                }
                return response.json();
            })
            .then((data) => {
                setMedicineForms(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (medicineForms.length === 0) return <p>No medicine forms found.</p>;

    return (
        <div>
            <h2>Medicine Forms</h2>
            <ul>
                {medicineForms.map((form) => (
                    <li key={form.formId}>{form.formName}</li>
                ))}
            </ul>
        </div>
    );
};

export default MedicineForm;
