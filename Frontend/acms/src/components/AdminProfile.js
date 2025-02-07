import React, { useState, useEffect } from "react";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const rid = localStorage.getItem("roleId");
    console.log("Role Id "+rid);
    if (!rid) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8092/employee/${rid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch the Admin Data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Admin Data", data);  // Check the structure of the response here
        setProfile(data);
        setOriginalProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile", err);
        setError("Failed to load the Admin Data");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      user: {
        ...prevProfile.user,
        [name]: value,  // Update the nested 'user' field correctly
      },
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const rid = localStorage.getItem("roleId");
    // console.log("Role Id :"+rid);
    if (!rid) return;

    const updatedFields = {};
        Object.keys(profile).forEach((key) => {
            if (profile[key] !== originalProfile[key]) {
                updatedFields[key] = profile[key];
            }
        });

    if (Object.keys(updatedFields).length === 0) {
      alert("⚠ No changes detected.");
      return;
    }

    fetch(`http://localhost:8081/update/admin/${rid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Profile updated successfully!");
        setOriginalProfile({ ...profile });
        setIsEditing(false); // Exit edit mode after saving
      })
      .catch((err) => alert("Failed to update profile."));
  };

  if (loading) return <p>Loading Admin details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <form onSubmit={handleProfileUpdate}>
      <div className="admin-profile-container">
        <h2 className="admin-profile-title">Admin Profile</h2>
        <div className="admin-profile-card">
          <label>Username:</label>
          <input
            type="text"
            name="uname"
            value={profile?.uname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={profile?.password || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={profile?.fname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={profile?.lname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={profile?.dob || ""}
            disabled
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profile?.address || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile?.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={profile?.employee.qualification || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          {!isEditing ? (
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button type="submit" className="edit-button" onClick={handleProfileUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AdminProfile;
