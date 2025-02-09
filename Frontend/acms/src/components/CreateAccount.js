import React, { useState } from "react";
import "../styles/CreateAccount.css";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    doj: "",
    regno: "",
    qualification: "",
    user: {
      uname: "",
      password: "",
      fname: "",
      lname: "",
      dob: "",
      address: "",
      roleId: "",
      gender: "",
      email: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["uname", "password", "fname", "lname", "dob", "address", "roleId", "gender", "email"].includes(name)) {
      setInfo({ ...info, user: { ...info.user, [name]: value } });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!info.user.roleId) newErrors.roleId = "Please select a role.";
    if (!info.user.uname.trim() || !/^[a-zA-Z0-9][a-zA-Z0-9@_-]{3,13}[a-zA-Z0-9]$/.test(info.user.uname)) {
      newErrors.uname = "Username must be 5-15 characters long and valid.";
    }
    if (!info.user.password || info.user.password.length < 8 || !/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$^%&*])/.test(info.user.password)) {
      newErrors.password = "Password must be 8+ characters with uppercase, number & special character.";
    }
    if (!info.user.fname.trim() || !/^[a-zA-Z]+$/.test(info.user.fname)) {
      newErrors.fname = "First name must contain only letters.";
    }
    if (!info.user.lname.trim() || !/^[a-zA-Z]+$/.test(info.user.lname)) {
      newErrors.lname = "Last name must contain only letters.";
    }
    if (!info.user.dob) newErrors.dob = "Date of Birth is required.";
    if (!info.doj) newErrors.doj = "Date of Joining is required.";
    if (!info.regno.trim() || isNaN(info.regno)) newErrors.regno = "Register number must be numeric.";
    if (!info.qualification.trim() || info.qualification.length < 2) {
      newErrors.qualification = "Qualification must be at least 2 characters.";
    }
    if (!info.user.address.trim() || info.user.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters.";
    }
    if (!info.user.email.trim() || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(info.user.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!info.user.gender) newErrors.gender = "Please select a gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      doj: info.doj,
      regno: info.regno,
      qualification: info.qualification,
      user: {
        ...info.user,
        roleId: parseInt(info.user.roleId), // Ensure roleId is sent as a number
      },
    };

    fetch("http://localhost:8093/addEmployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
        throw new Error("Server Error");
      })
      .then(() => {
        alert("Account Created Successfully! Try login");
        navigate("/login");
      })
      .catch(() => alert("Server Error. Try later."));
  };

  const roles = [
    { id: "1", name: "Doctor" },
    { id: "2", name: "Assistant Doctor" },
    { id: "4", name: "Receptionist" },
  ];

  return (
    <div className="create-account-container">
      <h2>Create New Account</h2>
      <form>
        <label>Role:</label>
        <select name="roleId" value={info.user.roleId} onChange={handleChange} required>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && <p className="error">{errors.roleId}</p>}

        <label>Username:</label>
        <input type="text" name="uname" value={info.user.uname} onChange={handleChange} required />
        {errors.uname && <p className="error">{errors.uname}</p>}

        <label>Password:</label>
        <input type="password" name="password" value={info.user.password} onChange={handleChange} required />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>First Name:</label>
        <input type="text" name="fname" value={info.user.fname} onChange={handleChange} required />
        {errors.fname && <p className="error">{errors.fname}</p>}

        <label>Last Name:</label>
        <input type="text" name="lname" value={info.user.lname} onChange={handleChange} required />
        {errors.lname && <p className="error">{errors.lname}</p>}

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={info.user.dob} onChange={handleChange} required />
        {errors.dob && <p className="error">{errors.dob}</p>}

        <label>Register No:</label>
        <input type="number" name="regno" value={info.regno} onChange={handleChange} required />
        {errors.regno && <p className="error">{errors.regno}</p>}

        <label>Date of Joining:</label>
        <input type="date" name="doj" value={info.doj} onChange={handleChange} required />
        {errors.doj && <p className="error">{errors.doj}</p>}

        <label>Gender:</label>
        <div className="gender-options">
          <label>
            <input type="radio" name="gender" value="Male" checked={info.user.gender === "Male"} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={info.user.gender === "Female"} onChange={handleChange} /> Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <label>Email:</label>
        <input type="email" name="email" value={info.user.email} onChange={handleChange} required />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Address:</label>
        <input type="text" name="address" value={info.user.address} onChange={handleChange} required />
        {errors.address && <p className="error">{errors.address}</p>}

        <label>Qualification:</label>
        <input type="text" name="qualification" value={info.qualification} onChange={handleChange} required />
        {errors.qualification && <p className="error">{errors.qualification}</p>}

        <button type="submit" onClick={sendData}>Create Account</button>
        <button type="reset" onClick={() => setInfo({ doj: "", regno: "", qualification: "", user: { uname: "", password: "", fname: "", lname: "", dob: "", address: "", roleId: "", gender: "", email: "" } })} style={{ backgroundColor: "red" }}>Clear</button>
      </form>
    </div>
  );
}

export default CreateAccount;
