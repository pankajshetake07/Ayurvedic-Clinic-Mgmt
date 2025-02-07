import React, { useReducer, useState } from "react";
import "../styles/CreateAccount.css";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  const init = {
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
    regno: "",
    doj: "",
    qualification: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        if (action.fld in state.user) {
          return { ...state, user: { ...state.user, [action.fld]: action.val } };
        }
        return { ...state, [action.fld]: action.val };
      case "reset":
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (
      !info.user.uname.trim() || 
      !/^[a-zA-Z0-9][a-zA-Z0-9@_-]{3,13}[a-zA-Z0-9]$/.test(info.user.uname)
    ) {
      newErrors.uname = "Username must be 5-15 characters long, start and end with a letter or digit, and can only contain letters, numbers, underscores (_), hyphens (-), and the @ symbol.";
    }
    
    if (!info.user.password || info.user.password.length < 6 || !/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$^%&*])[A-Za-z0-9~!@#$%^&*(){8,32}]/.test(info.user.password)) {
      newErrors.password = "Password must be 8-32 characters long and include at least one uppercase letter, one digit, and one special character (~!@#$^%&*). Only letters, numbers, and the allowed special characters are permitted. Spaces are not allowed.";
    }
    if (!info.user.fname.trim() || !/^[a-zA-Z]+$/.test(info.user.fname)) {
      newErrors.fname = "First name must contain only letters";
    }
    if (!info.user.lname.trim() || !/^[a-zA-Z]+$/.test(info.user.lname)) {
      newErrors.lname = "Last name must contain only letters.";
    }
    if (!info.user.dob) {
      newErrors.dob = "Date of Birth is required.";
    }
    if (!info.doj) {
      newErrors.doj = "Date of Joining is required.";
    }
    if (!info.regno.trim() || isNaN(info.regno)) {
      newErrors.regno = "Register number must be numeric.";
    }
    if (!info.qualification.trim() || info.qualification.length < 2) {
      newErrors.qualification = "Qualification must be at least 2 characters.";
    }
    if (!info.user.address.trim() || info.user.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters.";
    }

    // "Enter a valid email address in the format: example@domain.com. Only letters, numbers, dots (.), hyphens (-), and underscores (_) are allowed."
    if (!info.user.email.trim() || !/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(info.user.email)) {
      newErrors.email = "Invalid email format.Enter the format like(e.g. example@domain.com";
    }
    if (!info.user.gender) {
      newErrors.gender = "Please select a gender.";
    }
    if (!info.user.roleId) {
      newErrors.roleId = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };

    fetch("http://localhost:8092/addEmployee", reqOptions)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("Server Error");
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
        <select
          value={info.user.roleId}
          onChange={(e) => dispatch({ type: "update", fld: "roleId", val: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && <p className="error">{errors.roleId}</p>}

        <label>Username:</label>
        <input type="text" value={info.user.uname} onChange={(e) => dispatch({ type: "update", fld: "uname", val: e.target.value })} required />
        {errors.uname && <p className="error">{errors.uname}</p>}

        <label>Password:</label>
        <input type="password" value={info.user.password} onChange={(e) => dispatch({ type: "update", fld: "password", val: e.target.value })} required />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>First Name:</label>
        <input type="text" value={info.user.fname} onChange={(e) => dispatch({ type: "update", fld: "fname", val: e.target.value })} required />
        {errors.fname && <p className="error">{errors.fname}</p>}

        <label>Last Name:</label>
        <input type="text" value={info.user.lname} onChange={(e) => dispatch({ type: "update", fld: "lname", val: e.target.value })} required />
        {errors.lname && <p className="error">{errors.lname}</p>}

        <label>Date of Birth:</label>
        <input type="date" value={info.user.dob} onChange={(e) => dispatch({ type: "update", fld: "dob", val: e.target.value })} required />
        {errors.dob && <p className="error">{errors.dob}</p>}

        <label>Register No:</label>
        <input type="number" value={info.regno} onChange={(e) => dispatch({ type: "update", fld: "regno", val: e.target.value })} required />
        {errors.regno && <p className="error">{errors.regno}</p>}

        <label>Date of Joining:</label>
        <input type="date" value={info.doj} onChange={(e) => dispatch({ type: "update", fld: "doj", val: e.target.value })} required />
        {errors.doj && <p className="error">{errors.doj}</p>}

        <label>Gender:</label>
        <div className="gender-options">
          <label><input type="radio" value="Male" checked={info.user.gender === "Male"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} /> Male</label>
          <label><input type="radio" value="Female" checked={info.user.gender === "Female"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} /> Female</label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <label>Email:</label>
        <input type="email" value={info.user.email} onChange={(e) => dispatch({ type: "update", fld: "email", val: e.target.value })} required />
        {errors.email && <p className="error">{errors.email}</p>}

        <button type="submit" onClick={sendData}>Create Account</button>
        <button type="reset" onClick={() => dispatch({ type: "reset" })} style={{backgroundColor:"red"}}>Clear</button>
      </form>
    </div>
  );
}

export default CreateAccount;
