import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button, Modal, Form, Nav, Spinner } from "react-bootstrap";
import { FaUserMd, FaUsers, FaClipboardList, FaFileDownload, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("employees");
    const [newEmployee, setNewEmployee] = useState({
        user: {
            uname: "",
            password: "",
            fname: "",
            lname: "",
            dob: "",
            address: "",
            gender: "Male",
            email: "",
            roleId: "2",
        },
        doj: "",
        regno: "",
        qualification: "",
    });

    useEffect(() => {
        fetchEmployees();
        fetchAppointments();
        fetchPatients();
    }, []);

    const fetchEmployees = () => {
        axios.get("http://localhost:8092/api/admin/employees")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    };

    const fetchAppointments = () => {
        axios.get("http://localhost:8092/api/admin/appointments")
            .then(response => setAppointments(response.data))
            .catch(error => console.error("Error fetching appointments:", error));
    };

    const fetchPatients = () => {
        axios.get("http://localhost:8092/api/admin/patients")
            .then(response => setPatients(response.data))
            .catch(error => console.error("Error fetching patients:", error));
    };

    const addEmployee = () => {
        axios.post("http://localhost:8092/api/admin/addEmployee", newEmployee)
            .then(response => {
                alert(`Employee added!\nUsername: ${response.data.user.uname}\nPassword: ${newEmployee.user.password}`);
                setShowModal(false);
                fetchEmployees();
            })
            .catch(error => console.error("Error adding employee:", error));
    };

    const deleteEmployee = (eid) => {
        axios.delete(`http://localhost:8092/api/admin/deleteEmployee/${eid}`)
            .then(() => {
                alert("Employee deleted successfully!");
                fetchEmployees();
            })
            .catch(error => console.error("Error deleting employee:", error));
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col className="text-center">
                    <h2>Admin Dashboard</h2>
                </Col>
            </Row>

            {/* Admin Statistics */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="p-3 text-center">
                        <FaUsers size={30} className="text-primary" />
                        <h5>Total Employees</h5>
                        <p>{employees.length}</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3 text-center">
                        <FaClipboardList size={30} className="text-success" />
                        <h5>Total Appointments</h5>
                        <p>{appointments.length}</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3 text-center">
                        <FaUserMd size={30} className="text-danger" />
                        <h5>Total Patients</h5>
                        <p>{patients.length}</p>
                    </Card>
                </Col>
            </Row>

            {/* Navigation Tabs */}
            <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                    <Nav.Link active={activeTab === "employees"} onClick={() => setActiveTab("employees")}>
                        Employees
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === "appointments"} onClick={() => setActiveTab("appointments")}>
                        Appointments
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === "patients"} onClick={() => setActiveTab("patients")}>
                        Patients
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Employees Section */}
            {activeTab === "employees" && (
                <Card className="p-3">
                    <h4>Manage Employees</h4>
                    <Button className="mb-3" onClick={() => setShowModal(true)}>
                        <FaPlus /> Add Employee
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>DOJ</th>
                                <th>Reg. No</th>
                                <th>Qualification</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.eid}>
                                    <td>{emp.eid}</td>
                                    <td>{emp.user.fname} {emp.user.lname}</td>
                                    <td>{emp.user.roleId}</td>
                                    <td>{emp.user.email}</td>
                                    <td>{emp.doj}</td>
                                    <td>{emp.regno}</td>
                                    <td>{emp.qualification}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => deleteEmployee(emp.eid)}>
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            {/* Appointments Section */}
            {activeTab === "appointments" && (
                <Card className="p-3">
                    <h4>Manage Appointments</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td>{app.doctorName}</td>
                                    <td>{app.patientName || "Not Booked"}</td>
                                    <td>{app.date}</td>
                                    <td>{app.time}</td>
                                    <td>{app.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            {/* Patients Section */}
            {activeTab === "patients" && (
                <Card className="p-3">
                    <h4>Registered Patients</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>DOB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map(patient => (
                                <tr key={patient.uid}>
                                    <td>{patient.uid}</td>
                                    <td>{patient.fname} {patient.lname}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.dob}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Container>
    );
};

export default AdminDashboard;
