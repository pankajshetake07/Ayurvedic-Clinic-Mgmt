import React, { useState, useEffect } from "react";
import "../styles/AdminViewFeedback.css"

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch feedback data from the backend API
    useEffect(() => {
        fetch("http://localhost:8091/feedback/getAll")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched feedback data:", data);
                setFeedbacks(data);
            })
            .catch((error) => console.error("Error fetching feedback data:", error));
    }, []);

    return (
        <div className="admin-feedback-container">
            <h2 className="admin-feedback-title">Feedback</h2>
            <div className="feedback-table-wrapper">
                <table className="feedback-table" border={1}>
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.fid}>
                                <td>{feedback.rating}</td>
                                <td>{feedback.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFeedback;
