// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "./slice";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// export default function Logout() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogout = () => {
//         dispatch(logout()); // Update Redux state
//         localStorage.clear(); // Remove stored session data
//         navigate("/login"); // Redirect to login
//     };

//     return (
//         <button className="btn btn-danger px-4 py-2 fw-bold" onClick={handleLogout}>
//             <i className="bi bi-box-arrow-right"></i> Logout
//         </button>
//     );
// }

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./slice";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            dispatch(logout()); // Update Redux state
            localStorage.clear(); // Remove stored session data
            navigate("/login"); // Redirect to login
        }
    };

    return (
        <button className="btn btn-danger px-4 py-2 fw-bold" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
        </button>
    );
}
