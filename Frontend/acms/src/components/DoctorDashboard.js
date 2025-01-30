import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Button, Table, Form } from "react-bootstrap";
import { FaUserMd, FaCalendarAlt, FaClipboardList, FaChartLine, FaSignOutAlt, FaUser } from "react-icons/fa";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-4">
        <Col className="text-center">
          <h2>
            <FaUserMd /> Doctor Dashboard
          </h2>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active={activeTab === "appointments"} onClick={() => setActiveTab("appointments")}>
            <FaCalendarAlt /> Appointments
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "patients"} onClick={() => setActiveTab("patients")}>
            <FaUser /> Patients
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "prescriptions"} onClick={() => setActiveTab("prescriptions")}>
            <FaClipboardList /> Prescriptions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "reports"} onClick={() => setActiveTab("reports")}>
            <FaChartLine /> Reports
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
            <FaUserMd /> Profile
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Dynamic Content */}
      <Row>
        <Col>
          {activeTab === "appointments" && (
            <Card className="p-3">
              <h4>Upcoming Appointments</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>2025-02-10</td>
                    <td>10:00 AM</td>
                    <td><Button variant="primary">View</Button></td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          )}

          {activeTab === "patients" && (
            <Card className="p-3">
              <h4>Patient Records</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Condition</th>
                    <th>Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mary Jane</td>
                    <td>34</td>
                    <td>Diabetes</td>
                    <td>2025-01-28</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          )}

          {activeTab === "prescriptions" && (
            <Card className="p-3">
              <h4>Manage Prescriptions</h4>
              <Form>
                <Form.Group controlId="patientName">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter patient name" />
                </Form.Group>
                <Form.Group controlId="medicine">
                  <Form.Label>Medicine</Form.Label>
                  <Form.Control type="text" placeholder="Enter medicine name" />
                </Form.Group>
                <Button variant="success" className="mt-3">Submit</Button>
              </Form>
            </Card>
          )}

          {activeTab === "reports" && (
            <Card className="p-3">
              <h4>Reports & Analytics</h4>
              <p>View health trends and patient data analysis.</p>
            </Card>
          )}

          {activeTab === "profile" && (
            <Card className="p-3">
              <h4>Doctor Profile</h4>
              <p>Name: Dr. John Smith</p>
              <p>Specialization: Cardiology</p>
              <p>Experience: 10 years</p>
            </Card>
          )}
        </Col>
      </Row>

      {/* Logout Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger">
            <FaSignOutAlt /> Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
