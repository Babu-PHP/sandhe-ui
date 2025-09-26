import { useState } from "react";

function AddCart() {
  const [formData, setFormData] = useState({
    cartType: "",
    cartName: "",
    vehicleNo: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Cart Added Successfully!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Add Cart</h2>
      <form onSubmit={handleSubmit}>
        {/* Cart Type */}
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Cart Type</label>
          <select
            name="cartType"
            value={formData.cartType}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Cart Name */}
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Cart Name</label>
          <input
            type="text"
            name="cartName"
            value={formData.cartName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Vehicle No */}
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Vehicle No</label>
          <input
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Photo */}
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCart;