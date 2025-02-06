import { useState } from "react";
import axios from "axios";
import "../styles/AdminAddMedicine.css"; // Import the CSS file

const MedicineForm = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    form_name: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/medicines/add", medicine)
      .then((response) => {
        alert("Medicine added successfully!");
        setMedicine({
          name: "",
          description: "",
          price: "",
          stock_quantity: "",
          form_name: "",
        });
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        alert("Failed to add medicine. Please try again.");
      });
  };

  return (
    <div className="medicine-form-container">
      <h2>Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="medicine-form">
        <label>Medicine Name:</label>
        <input type="text" name="name" value={medicine.name} onChange={handleChange} required />

        <label>Medicine Form:</label>
        <select name="form_name" value={medicine.form_name} onChange={handleChange}  style={{height:"40px"}} required>
          <option value="" disabled>Select Medicine Form</option>
          <option value="Liquid">Liquid</option>
          <option value="Tablet">Tablet</option>
          <option value="Powder">Powder</option>
          <option value="Capsule">Capsule</option>
          <option value="Injection">Injection</option>
        </select>
<br></br>
        <label>Description:</label>
        <textarea name="description" value={medicine.description} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={medicine.price} onChange={handleChange} required />

        <label>Stock Quantity:</label>
        <input type="number" name="stock_quantity" value={medicine.stock_quantity} onChange={handleChange} required />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default MedicineForm;
