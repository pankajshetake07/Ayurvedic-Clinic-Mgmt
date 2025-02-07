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

      const [errors, setErrors] = useState({});
    
      const validate = () => {
        let newErrors = {};
    
        if (
          !info.uname.trim() || 
          !/^[a-zA-Z0-9][a-zA-Z0-9@_-]{3,13}[a-zA-Z0-9]$/.test(info.uname)
        ) {
          newErrors.uname = "Username must be 5-15 characters long, start and end with a letter or digit, and can only contain letters, numbers, underscores (_), hyphens (-), and the @ symbol.";
        }
        
        if (!info.password || info.password.length < 6 || !/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$^%&*])[A-Za-z0-9~!@#$%^&*(){8,32}]/.test(info.password)) {
          newErrors.password = "Password must be 8-32 characters long and include at least one uppercase letter, one digit, and one special character (~!@#$^%&*). Only letters, numbers, and the allowed special characters are permitted. Spaces are not allowed.";
        }
        if (!info.fname.trim() || !/^[a-zA-Z]+$/.test(info.fname)) {
          newErrors.fname = "First name must contain only letters";
        }
        if (!info.lname.trim() || !/^[a-zA-Z]+$/.test(info.lname)) {
          newErrors.lname = "Last name must contain only letters.";
        }
        if (!info.dob) {
          newErrors.dob = "Date of Birth is required.";
        }
        
        if (!info.address.trim() || info.user.length < 5) {
          newErrors.address = "Address must be at least 5 characters.";
        }
    
        // "Enter a valid email address in the format: example@domain.com. Only letters, numbers, dots (.), hyphens (-), and underscores (_) are allowed."
        if (!info.email.trim() || !/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(info.email)) {
          newErrors.email = "Invalid email format.Enter the format like(e.g. example@domain.com";
        }
        if (!info.gender) {
          newErrors.gender = "Please select the gender.";
        }
       
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


    const sendData = (e) => {
        e.preventDefault();
        if (!validate()) return;
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
                            /> {errors.fname && <p className="error">{errors.fname}</p>}
                            <span className="input-icon">👤</span>
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={info.lname}
                                onChange={(e) => dispatch({ type: 'update', fld: 'lname', val: e.target.value })}
                                placeholder="Enter your last name"
                            />{errors.lname && <p className="error">{errors.lname}</p>}
                            <span className="input-icon">👥</span>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={info.dob}
                                onChange={(e) => dispatch({ type: 'update', fld: 'dob', val: e.target.value })}
                            />{errors.dob && <p className="error">{errors.dob}</p>}
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
                            {errors.gender && <p className="error">{errors.gender}</p>}
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
                            /> {errors.uname && <p className="error">{errors.uname}</p>}
                            <span className="input-icon">🔑</span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={info.password}
                                onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                                placeholder="Create a password"
                            />{errors.password && <p className="error">{errors.password}</p>}
                            <span className="input-icon">🔒</span>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={info.email}
                                onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
                                placeholder="Enter your email"
                            /> {errors.email && <p className="error">{errors.email}</p>}
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
                            {errors.address && <p className="error">{errors.address}</p>}
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

            <div className="login-redirect" >
                Already have an account? <a href="/login" style={{color:"blue"}}>Login here</a>
            </div>
        </div>
    )
}