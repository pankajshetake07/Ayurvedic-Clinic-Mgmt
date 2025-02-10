import React, { useState } from "react";

const API_BASE = "http://localhost:8090";

const ForgotPassword = () => {
    const [uname, setUname] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(""); // Reset messages
        setError("");

        fetch(`${API_BASE}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uname }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMessage("Password has been sent to your registered email.");
                } else {
                    setError("User not found. Please enter a valid username.");
                }
            })
            .catch(() => setError("Server error. Please try again later."));
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter Username</label>
                    <input
                        type="text"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
