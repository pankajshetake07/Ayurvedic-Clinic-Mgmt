import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Registration.css';

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
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        const namePattern = /^[A-Za-z]{2,30}$/; // Only alphabets, min 2 max 30 characters
        const usernamePattern = /^[A-Za-z][A-Za-z0-9]{3,19}$/; // Starts with letter, can include numbers, 4-20 chars
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{6,}$/; // Min 6 chars, 1 letter, 1 number, @
        const emailPattern = /^[a-zA-Z]+[a-zA-Z0-9]*@gmail\.com$/; // Starts with letters, can have numbers, must end with @gmail.com
        const addressPattern = /^[A-Za-z0-9\s,.'-]{10,100}$/; // Min 10 max 100 characters

        if (!info.fname.match(namePattern)) newErrors.fname = "First name must contain only alphabets (2-30 chars)";
        if (!info.lname.match(namePattern)) newErrors.lname = "Last name must contain only alphabets (2-30 chars)";
        if (!info.uname.match(usernamePattern)) newErrors.uname = "Username must start with a letter and be 4-20 characters long";
        if (!info.password.match(passwordPattern)) newErrors.password = "Password must be at least 6 chars, contain 1 letter, 1 number, and @";
        if (!info.email.match(emailPattern)) newErrors.email = "Email must start with letters, contain numbers (optional), and end with @gmail.com";
        if (!info.address.match(addressPattern)) newErrors.address = "Address should be 10-100 characters long";
        if (!info.dob) newErrors.dob = "Date of birth is required";
        if (!info.gender) newErrors.gender = "Please select a gender";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendData = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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
    };

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
                            {errors.fname && <span className="error">{errors.fname}</span>}
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={info.lname}
                                onChange={(e) => dispatch({ type: 'update', fld: 'lname', val: e.target.value })}
                                placeholder="Enter your last name"
                            />
                            {errors.lname && <span className="error">{errors.lname}</span>}
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={info.dob}
                                onChange={(e) => dispatch({ type: 'update', fld: 'dob', val: e.target.value })}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {errors.dob && <span className="error">{errors.dob}</span>}
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
                            {errors.gender && <span className="error">{errors.gender}</span>}
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
                            {errors.uname && <span className="error">{errors.uname}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={info.password}
                                onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                                placeholder="Create a password"
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={info.email}
                                onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                value={info.address}
                                onChange={(e) => dispatch({ type: 'update', fld: 'address', val: e.target.value })}
                                placeholder="Enter your full address"
                                rows="3"
                            ></textarea>
                            {errors.address && <span className="error">{errors.address}</span>}
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
    );
}
