import { Link } from "react-router-dom";

export default function AdminHome() {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">View Doctor</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">View Patient</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">View Appointments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Register Employee</a>
                        </li>
                        <li class="nav-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}