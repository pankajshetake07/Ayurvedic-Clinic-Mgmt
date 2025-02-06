import React, { useState, useEffect } from "react";
import "../styles/AdminViewFeedback.css"

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch feedback data from the backend API
    useEffect(() => {
        fetch("http://localhost:8081/getAllFeedbacks")
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
            <h2 className="admin-feedback-title">User Feedback</h2>
            <div className="feedback-table-wrapper">
                <table className="feedback-table" border={1}>
                    <thead>
                        <tr>
                            <th>Feedback ID</th>
                            <th>Rating</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                               <td>1</td>
                                <td>Good Service</td>
                                <td>5</td>
                                </tr>
                                <tr>
                               <td>2</td>
                                <td>Bad Service</td>
                                <td>2</td>
                                </tr> */}
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.fid}>
                                <td>{feedback.fid}</td>
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
