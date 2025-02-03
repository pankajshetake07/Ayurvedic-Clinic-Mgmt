import React, { useState } from 'react';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');

    return (
        <div className="dashboard-card">
            <h2>Give Feedback</h2>
            <form>
                <div className="form-group">
                    <label>Your Feedback</label>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
