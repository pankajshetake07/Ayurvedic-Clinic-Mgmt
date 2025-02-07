import React, { useReducer, useState } from "react";
import "../styles/CreateAccount.css"; // Import the CSS file
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
      status: "",
      email: "",
    },
    regno: "",
    doj: "",
    qualification: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        // If the field belongs to user, update inside user object
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
  const [msg, setMsg] = useState("");

  const sendData = (e) => {
    e.preventDefault();

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
    { id: "3", name: "Receptionist" },
  ];

  return (
    <div className="create-account-container">
      <h2>Create New Account</h2>
      <form>
        <label>Role:</label>
        <select
          name="roleId"
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

        <label>Username:</label>
        <input type="text" name="uname" value={info.user.uname} onChange={(e) => dispatch({ type: "update", fld: "uname", val: e.target.value })} placeholder="Enter the username" required />

        <label>Password:</label>
        <input type="password" name="password" value={info.user.password} onChange={(e) => dispatch({ type: "update", fld: "password", val: e.target.value })} placeholder="Create a password" required />

        <label>First Name:</label>
        <input type="text" name="fname" value={info.user.fname} onChange={(e) => dispatch({ type: "update", fld: "fname", val: e.target.value })} placeholder="Enter the first name" required />

        <label>Last Name:</label>
        <input type="text" name="lname" value={info.user.lname} onChange={(e) => dispatch({ type: "update", fld: "lname", val: e.target.value })} placeholder="Enter the last name" required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={info.user.dob} onChange={(e) => dispatch({ type: "update", fld: "dob", val: e.target.value })} required />


        {/* <label>Role Id:</label>
        <input type="number" name="regno" value={info.user.roleId} onChange={(e) => dispatch({ type: "update", fld: "roleId", val: e.target.value })} placeholder="Enter the Role Id" required /> */}

        <label>Register No:</label>
        <input type="number" name="regno" value={info.regno} onChange={(e) => dispatch({ type: "update", fld: "regno", val: e.target.value })} placeholder="Enter the Register Number" required />

        <label>Date of Joining:</label>
        <input type="date" name="doj" value={info.doj} onChange={(e) => dispatch({ type: "update", fld: "doj", val: e.target.value })} required />

        <label>Qualification:</label>
        <input type="text" name="qualification" value={info.qualification} onChange={(e) => dispatch({ type: "update", fld: "qualification", val: e.target.value })} placeholder="Enter the Qualification" required />

        <label>Address:</label>
        <input type="text" name="address" value={info.user.address} onChange={(e) => dispatch({ type: "update", fld: "address", val: e.target.value })} placeholder="Enter the Address" required />

        <label>Gender:</label>
        <div className="gender-options">
          <label>
            <input type="radio" name="gender" value="Male" checked={info.user.gender === "Male"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} required /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={info.user.gender === "Female"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} required /> Female
          </label>
        </div>

        <label>Status:</label>
        <select name="status" value={info.user.status} onChange={(e) => dispatch({ type: "update", fld: "status", val: e.target.value })} required>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <label>Email:</label>
        <input type="email" name="email" value={info.user.email} onChange={(e) => dispatch({ type: "update", fld: "email", val: e.target.value })} placeholder="Enter the Email" required />

        <button type="submit" onClick={sendData} className="create-btn">
          Create Account
        </button>
        <button type="reset" className="clear-btn" onClick={() => dispatch({ type: "reset" })}>
          Clear
        </button>
      </form>
      <div className="login-redirect">Already have an account? <a href="/login">Login here</a></div>
    </div>
  );
}

export default CreateAccount;
