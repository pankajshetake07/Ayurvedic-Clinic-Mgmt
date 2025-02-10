import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Registration.css'

export default function Register() {

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
        const reqOptions = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info)
        };
        fetch("http://localhost:8091/register", reqOptions)
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
        <div className="register-container">
            <div className="register-header">
                <h1>Welcome to PrakritiSync</h1>
                <p>Begin your wellness journey with us</p>
            </div>

            <form className="ayurvedic-form">
                <div className="form-section">
                    <h2>Personal Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={info.fname}
                                onChange={(e) => dispatch({ type: 'update', fld: 'fname', val: e.target.value })}
                                placeholder="Enter your first name"
                            />
                            <span className="input-icon">👤</span>
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={info.lname}
                                onChange={(e) => dispatch({ type: 'update', fld: 'lname', val: e.target.value })}
                                placeholder="Enter your last name"
                            />
                            <span className="input-icon">👥</span>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={info.dob}
                                onChange={(e) => dispatch({ type: 'update', fld: 'dob', val: e.target.value })}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            <span className="input-icon">📅</span>
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                value={info.gender}
                                onChange={(e) => dispatch({ type: 'update', fld: 'gender', val: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <span className="input-icon">⚥</span>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Account Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={info.uname}
                                onChange={(e) => dispatch({ type: 'update', fld: 'uname', val: e.target.value })}
                                placeholder="Choose a username"
                            />
                            <span className="input-icon">🔑</span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={info.password}
                                onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                                placeholder="Create a password"
                            />
                            <span className="input-icon">🔒</span>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={info.email}
                                onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
                                placeholder="Enter your email"
                            />
                            <span id="mail" className="input-icon">✉️</span> {/* Mail icon */}
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                value={info.address}
                                onChange={(e) => dispatch({ type: 'update', fld: 'address', val: e.target.value })}
                                placeholder="Enter your full address"
                                rows="3"
                            ></textarea>
                            <span id="add" className="input-icon">🏠</span> {/* Address icon */}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" onClick={sendData}>
                        Create Account
                    </button>
                    <button type="reset" className="clear-btn" onClick={() => dispatch({ type: 'reset' })}>
                        Clear Form
                    </button>
                </div>
            </form>

            <div className="login-redirect">
                Already have an account? <a href="/login">Login here</a>
            </div>
        </div>
    )
}