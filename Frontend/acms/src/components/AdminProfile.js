import React, { useState, useEffect, useId } from "react";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const rid = localStorage.getItem("roleId");
    const userID = localStorage.getItem("userId");

    if (!rid || !userID) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8093/employee/${userID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch the Admin Data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Admin Data", data);
        setProfile(data);
        setOriginalProfile(data);

        //Store eid in session storage
        // /ssionStorage.setItem("uid", data.user.uid);
        // console.log(sessionStorage.getItem("uid"));
        // console.log("EID stored in session:", sessionStorage.getItem("eid"));

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
    const eid = sessionStorage.getItem("eid");
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
    const userID = localStorage.getItem("userId");
    fetch(`http://localhost:8093/update/employee/${userID}`, {
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
            value={profile?.user.uname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={profile?.user.password || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={profile?.user.fname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={profile?.user.lname || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={profile?.user.dob || ""}
            disabled
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profile?.user.address || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile?.user.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={profile?.qualification || ""}
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
