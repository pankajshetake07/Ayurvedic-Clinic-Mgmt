
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDeleteEmployee.css";

const AdminDeletePatient = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8092/getAllPatients") // Update with your backend API URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete record
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:8081/patient/delete/${id}`)
        .then(() => {
          setData(data.filter((item) => item.user.uid !== id));
          alert("Record deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
          alert("Failed to delete record. Please try again.");
        });
    }
  };



  return (
    <div className="table-container">
      <h2 className="table-title">Patients Table</h2>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              {/* <th>User ID</th> */}
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Email</th>
              {/* <th>Patient Id</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.user.uid}>
                {/* <td>{item.user.uid}</td> */}
                <td>{item.user.uname}</td>
                <td>{item.user.fname}</td>
                <td>{item.user.lname}</td>
                <td>{item.user.dob}</td>
                <td>{item.user.address}</td>
                <td>{item.user.role.rname}</td>
                <td>{item.user.gender}</td>
                <td>{item.user.status == 0 ? 'Inactive' : 'Active'}</td>
                <td>{item.user.email}</td>
                {/* <td>{item.pid}</td> */}
                <td>
                  <button
                    onClick={() => handleDelete(item.user.uid)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
export default AdminDeletePatient;

