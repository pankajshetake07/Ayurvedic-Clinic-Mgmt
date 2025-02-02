import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./slice";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Update Redux state
        localStorage.clear(); // Remove stored session data
        navigate("/login"); // Redirect to login
    };

    return <button onClick={handleLogout}>Logout</button>;
}


