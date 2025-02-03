import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8081';

const Treatments = () => {
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/treatments`)
            .then(res => res.json())
            .then(data => setTreatments(data))
            .catch(err => console.error('Error fetching treatments:', err));
    }, []);

    return (
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
    );
};

export default Treatments;
