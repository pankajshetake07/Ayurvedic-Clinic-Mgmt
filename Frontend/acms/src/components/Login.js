import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdLock } from "react-icons/md";
import '../styles/Login.css'
import { login } from "./slice";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";

export default function Login() {
  const init = {
    uname: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.fld]: action.val };
      case "reset":
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };

    fetch("http://localhost:8090/auth/login", reqOptions)
      .then((resp) => {
        console.log("Response status:", resp.status);
        return resp.text();
      })
      .then((text) => {
        console.log("Raw response text:", text);
        return text.length ? JSON.parse(text) : {};
      })
      .then((obj) => {
        console.log("Parsed response object:", obj);
        if (Object.keys(obj).length === 0) {
          setMsg("Wrong username and password");
        } else {

          localStorage.setItem("userName", `${obj.fname} ${obj.lname}`); // Store name
          localStorage.setItem("userId", `${obj.uid}`)
          alert(localStorage.getItem("userId"))
          localStorage.setItem("roleId", obj.role.rid); // Store role

          reduxDispatch(login());
          if (obj.role.rid === 3) {
            navigate("/admin_home");
          } else if (obj.role.rid === 1) {
            navigate("/doctor_home");
          } else if (obj.role.rid === 2) {
            navigate("/assistance_doctor_home");
          } else if (obj.role.rid === 4) {
            navigate("/receptionist_home");
          } else {
            navigate("/patient_home");
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue your wellness journey</p>

        <form className="login-form">
          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <input
                type="text"
                value={info.uname}
                onChange={(e) => dispatch({ type: "update", fld: "uname", val: e.target.value })}
                placeholder="Enter your username"
              />
              <span id="uname" className="input-icon">
                <MdPerson size={20} />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <input
                type="password"
                value={info.password}
                onChange={(e) => dispatch({ type: "update", fld: "password", val: e.target.value })}
                placeholder="Enter your password"
              />
              <span id="pass" className="input-icon">
                <MdLock size={20} />
              </span>
            </div>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" onClick={sendData}>
              Login
            </button>
            <button type="reset" className="clear-btn" onClick={() => dispatch({ type: "reset" })}>
              Clear
            </button>
          </div>
        </form>

        <p className="error-message">{msg}</p>
        <p className="login-redirect">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

