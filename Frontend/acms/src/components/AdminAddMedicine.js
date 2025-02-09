import React, { useState } from "react";

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8094/api/AddMedicine/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add medicine");
        }
        return response.text(); // Expecting plain text response
      })
      .then((data) => {
        setMessage(data);
        setMedicine({ name: "", description: "", price: "", stockQuantity: "" });
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Medicine</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Medicine Name</label>
          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={medicine.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={medicine.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={medicine.stockQuantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
