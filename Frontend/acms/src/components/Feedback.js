import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");

    const API_URL = "http://localhost:8091/addfeedback";

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(API_URL, { content, rating })
            .then(() => {
                setMessage("Feedback submitted successfully!");
                setContent("");
                setRating(5);
            })
            .catch((error) => {
                console.error("Error submitting feedback", error);
                setMessage("Error submitting feedback.");
            });
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Add Feedback</h2>

            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 border rounded-md mb-4"
                    rows="4"
                    placeholder="Write your feedback..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <label className="block mb-2 font-semibold">Rating:</label>
                <select
                    className="p-2 border rounded-md"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num} ⭐
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg"
                >
                    Submit Feedback
                </button>
            </form>

            {message && <p className="mt-3 text-green-600">{message}</p>}
        </div>
    );
};

export default Feedback;
