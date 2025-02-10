import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:8090/service2";

const PatientProfile = () => {
    const [profile, setProfile] = useState(null);
    const [originalProfile, setOriginalProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    //Fetch patient details when component loads
    useEffect(() => {
        const uid = localStorage.getItem("userId");
        if (!uid) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        fetch(`${API_BASE}/patient/by-uid/${uid}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch patient data");
                return res.json();
            })
            .then(data => {
                console.log("Fetched Patient Data:", data);
                setProfile(data);
                setOriginalProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching profile:", err);
                setError("Failed to load patient details.");
                setLoading(false);
            });
    }, []);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle profile update 
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const uid = localStorage.getItem("userId");
        if (!uid) return;

        const updatedFields = {};
        Object.keys(profile).forEach((key) => {
            if (profile[key] !== originalProfile[key]) {
                updatedFields[key] = profile[key];
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            alert("No changes detected.");
            return;
        }

        fetch(`${API_BASE}/update/${uid}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields),
        })
            .then(res => res.json())
            .then(() => {
                alert("Profile updated successfully!");
                setOriginalProfile({ ...profile });
                setIsEditing(false); // Exit edit mode after saving
            })
            .catch(err => alert("Failed to update profile."));
    };

    if (loading) return <p>Loading patient details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="dashboard-card">
            <h2>My Profile</h2>
            <form onSubmit={handleProfileUpdate}>
                {/* UID (Not Editable) */}
                <div className="form-group">
                    <label>Unique ID (UID)</label>
                    <input type="text" value={profile?.uid || ""} disabled />
                </div>

                {/* PID (Not Editable) */}
                {/* <div className="form-group">
                    <label>Patient ID (PID)</label>
                    <input type="text" value={profile?.pid || ""} disabled />
                </div> */}

                {/* Editable Fields */}
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="uname" value={profile?.uname || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={profile?.password || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="fname" value={profile?.fname || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lname" value={profile?.lname || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={profile?.dob || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea name="address" value={profile?.address || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={profile?.email || ""} onChange={handleChange} disabled={!isEditing} />
                </div>

                {/* Edit & Save Buttons */}
                {!isEditing ? (
                    <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    <button type="submit">Save Changes</button>
                )}
            </form>
        </div>
    );
};

export default PatientProfile;
