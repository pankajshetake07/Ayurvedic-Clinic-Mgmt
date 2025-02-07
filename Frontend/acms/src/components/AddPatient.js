// import "../styles/AddPatient.css"

// export default function AddPatient()
// {
//   const init = {
//     uname: "",
//     password: "",
//     fname: "",
//     lname: "",
//     dob: "",
//     address: "",
//     gender: "",
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//       case 'update':
//           return { ...state, [action.fld]: action.val }
//       case 'reset':
//           return init
//   }
 
// }

// return (
//   <div>
//       <h1 id="add">Add Patient</h1>
//       <form id="add_p">
//           <div className="mb-3">
//               <label htmlFor="uid" className="form-label">Enter Username :</label>
//               <input type="text" className="form-control" id="uname" name="uname" 
//                />
//           </div>
//           <div className="mb-3">
//               <label htmlFor="password" className="form-label">Enter Password :</label>
//               <input type="password" className="form-control" id="password" name="password" 
//                    />
//           </div>

//           <div className="mb-3">
//               <label htmlFor="fname" className="form-label">Enter First Name :</label>
//               <input type="text" className="form-control" id="fname" name="fname" 
//                    />
//           </div>


//           <div className="mb-3">
//               <label htmlFor="lname" className="form-label">Enter Last Name :</label>
//               <input type="text" className="form-control" id="lname" name="lname" 
//                    />
//           </div>

//           <div className="mb-3">
//               <label htmlFor="dob" className="form-label">Enter Date of Birth :</label>
//               <input type="date" className="form-control" id="dob" name="dob" 
//                   />
//           </div>

//           <div className="mb-3">
//               <label htmlFor="address" className="form-label">Enter Address :</label>
//               <input type="text" className="form-control" id="address" name="address" 
//                    />
//           </div>

//           <div className="mb-3">
//               <label htmlFor="gender" className="form-label">Enter Gender :</label>
//               <input type="text" className="form-control" id="gender" name="gender"
//                    />
//           </div>

//            <div className="mb-3">
//               <label htmlFor="status" className="form-label">Enter Mail Id :</label>
//               <input type="text" className="form-control" id="email" name="mail id"
//                   />
//           </div> 

//           <div className="mb-3">
//               <label htmlFor="status" className="form-label">Enter Appointment Date :</label>
//               <input type="text" className="form-control" id="app_date" name="App_Date"
//                   />
//           </div>
//           <div className="mb-3">
//               <label htmlFor="status" className="form-label">Enter Appointment Time :</label>
//               <input type="time" className="form-control" id="app_time" name="App_Time"
//                   />
//           </div>

//           <div className="mb-3">
//   <label htmlFor="status" className="form-label d-block">Enter Previous History:</label>
//   <textarea id="status" name="App_Time" className="form-control" cols={60} rows={10}></textarea>
// </div>


//           <button type="submit" className="btn btn-primary mb-3" id="btn">SUBMIT</button>
//           <button type="reset" className="btn btn-primary mb-3" id="btn" style={{backgroundColor:"red"}}>CLEAR</button>
//       </form>
     
//   </div>

// )
// }


import React, { useReducer, useState } from "react";
import "../styles/AddPatient.css" // Import the CSS file
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const navigate = useNavigate();

  const init = {
    uname: "",
    password: "",
    fname: "",
    lname: "",
    dob: "",
    address: "",
    gender: "",
    email: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, [action.fld]: action.val };
        case 'reset':
            return init;
        default:
            return state;
    }
};

  const [info, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");

  
    const sendData = (e) => {
        e.preventDefault();
        // if (!validate()) return;
        const reqOptions = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info)
        };
        fetch("http://localhost:8081/register", reqOptions)
            .then(resp => {
                if (resp.ok) return resp.json();
                else throw new Error("Server error");
            })
            .then(() => {
                alert("Registration successful! Try Login");
                navigate('/login');
            })
            .catch(() => alert("Server error. Try later"));
    }

  return (
    <div className="add-patient-container">
      <h2 style={{fontWeight:"bold"}}>Add Patient Details</h2>
      <form>
        <label>Username:</label>
        <input type="text" name="uname" value={info.uname} onChange={(e) => dispatch({ type: "update", fld: "uname", val: e.target.value })} placeholder="Enter the username" required />

        <label>Password:</label>
        <input type="password" name="password" value={info.password} onChange={(e) => dispatch({ type: "update", fld: "password", val: e.target.value })} placeholder="Create a password" required />

        <label>First Name:</label>
        <input type="text" name="fname" value={info.fname} onChange={(e) => dispatch({ type: "update", fld: "fname", val: e.target.value })} placeholder="Enter the first name" required />

        <label>Last Name:</label>
        <input type="text" name="lname" value={info.lname} onChange={(e) => dispatch({ type: "update", fld: "lname", val: e.target.value })} placeholder="Enter the last name" required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={info.dob} onChange={(e) => dispatch({ type: "update", fld: "dob", val: e.target.value })} required />

        <label>Address:</label>
        <input type="text" name="address" value={info.address} onChange={(e) => dispatch({ type: "update", fld: "address", val: e.target.value })} placeholder="Enter the Address" required />
    
        <label>Gender:</label>
        <div className="p_gender-options">
          <label>
            <input type="radio" name="gender" value="Male" checked={info.gender === "Male"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} required /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={info.gender === "Female"} onChange={(e) => dispatch({ type: "update", fld: "gender", val: e.target.value })} required /> Female
          </label>
        </div>

        <label>Email:</label>
        <input type="email" name="email" value={info.email} onChange={(e) => dispatch({ type: "update", fld: "email", val: e.target.value })} placeholder="Enter the Email" required />
<div className="button-container">
        <button type="submit" onClick={sendData} className="create-btn">
          Add Patient
        </button>
        <button type="reset" className="p_clear-btn" onClick={() => dispatch({ type: "reset" })}>
          Clear
        </button>
        </div>
      </form>
      {/* <div className="p_login-redirect">Already have an account? <a href="/login">Login here</a></div> */}
    </div>
  );
}

export default AddPatient;
