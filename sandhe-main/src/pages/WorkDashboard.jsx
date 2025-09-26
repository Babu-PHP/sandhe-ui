import React, { useState } from "react";
import "./WorkDashboard.css"; // we'll move CSS there
import { useNavigate, Link } from "react-router-dom";

export default function WorkDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("mycarts");

  const [carts, setCarts] = useState([
    {
      id: 1,
      name: "Beach Gear Cart #12",
      type: "Medium",
      capacity: "50kg",
      status: "available",
      lastMaintenance: "2 days ago",
    },
    {
      id: 2,
      name: "Premium Lounge Cart #05",
      type: "Large",
      capacity: "80kg",
      status: "inuse",
      lastMaintenance: "1 week ago",
    },
    {
      id: 3,
      name: "Refreshment Cart #08",
      type: "Medium",
      capacity: "70kg",
      status: "available",
      lastMaintenance: "3 days ago",
    },
  ]);

  const [newCart, setNewCart] = useState({
    type: "",
    name: "",
    vehicleNo: "",
    photo: null,
  });

  const menuItems = [
    { key: "mycarts", label: "MyCarts", icon: "fas fa-shopping-cart" },
    { key: "availability", label: "MyCarts Availability", icon: "fas fa-calendar-check" },
    { key: "trips", label: "Trips", icon: "fas fa-route" },
    { key: "profile", label: "Profile", icon: "fas fa-user" },
    { key: "logout", label: "Logout", icon: "fas fa-sign-out-alt" },
  ];

  const handleMenuClick = (key) => {
    if (key === "logout") {
      alert("Logging out...");
      navigate("/"); // redirect to login
    } else {
      setActiveSection(key);
    }
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    const newCartItem = {
      id: carts.length + 1,
      name: newCart.name,
      type: newCart.type,
      capacity: newCart.type === "Medium" ? "50kg" : "80kg",
      status: "available",
      lastMaintenance: "Today",
    };

    setCarts([...carts, newCartItem]);
    setActiveSection("mycarts");
    setNewCart({ type: "", name: "", vehicleNo: "", photo: null });

    alert("Cart added successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCart({
      ...newCart,
      [name]: value,
    });
  };

  // Function to handle cart deletion
  const handleDeleteCart = (cartId) => {
    if (window.confirm("Are you sure you want to delete this cart?")) {
      setCarts(carts.filter(cart => cart.id !== cartId));
      alert("Cart deleted successfully!");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>SANDHE WORK</h3>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`menu-item ${activeSection === item.key ? "active" : ""}`}
              onClick={() => handleMenuClick(item.key)}
            >
              <i className={`${item.icon} menu-icon`}></i>
              <span className="menu-text">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Work Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <div>John Doe</div>
              <small>Beach Valet Operator</small>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <i className="fas fa-shopping-cart fa-2x"></i>
            <div className="stat-value">{carts.length}</div>
            <div className="stat-label">Active Carts</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-calendar-day fa-2x"></i>
            <div className="stat-value">12</div>
            <div className="stat-label">Available Slots</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-route fa-2x"></i>
            <div className="stat-value">8</div>
            <div className="stat-label">Today's Trips</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-star fa-2x"></i>
            <div className="stat-value">4.8</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {/* Sections */}
        {activeSection === "mycarts" && (
          <div className="content-card">
            <div className="card-header">
              <h3>My Carts</h3>
              <button className="btn-primary" onClick={() => setActiveSection("addcart")}>
                Add New Cart
              </button>
            </div>

            {carts.length === 0 ? (
              <div className="no-carts-message">
                <i className="fas fa-cart-arrow-down fa-3x"></i>
                <h4>No carts available</h4>
                <p>Add your first cart to get started</p>
              </div>
            ) : (
              carts.map((cart) => (
                <div key={cart.id} className="cart-item">
                  <div className="cart-icon">
                    <i className="fas fa-cart-arrow-down"></i>
                  </div>
                  <div className="cart-info">
                    <div className="cart-title">{cart.name}</div>
                    <div className="cart-details">
                      Type: {cart.type} | Capacity: {cart.capacity} | Last maintenance: {cart.lastMaintenance}
                    </div>
                  </div>
                  <div className="cart-actions">
                    <span className={`status-badge status-${cart.status}`}>
                      {cart.status === "available" ? "Available" : "In Use"}
                    </span>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDeleteCart(cart.id)}
                      title="Delete Cart"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* AddCart */}
        {activeSection === "addcart" && (
          <div className="content-card">
            <div className="card-header">
              <h3>Add New Cart</h3>
              <button className="btn-secondary" onClick={() => setActiveSection("mycarts")}>
                ←
              </button>
            </div>

            <form className="profile-form" onSubmit={handleAddCart}>
              <div className="form-group">
                <label>Cart Type</label>
                <select name="type" value={newCart.type} onChange={handleInputChange} required>
                  <option value="">Select Type</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cart Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter cart name"
                  value={newCart.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Vehicle No</label>
                <input
                  type="text"
                  name="vehicleNo"
                  placeholder="Enter vehicle number"
                  value={newCart.vehicleNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewCart({ ...newCart, photo: e.target.files[0] })}
                />
              </div>

              <div className="form-group full-width">
                <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                  Save Cart
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Other sections remain the same */}
        {activeSection === "availability" && (
          <div className="content-card">
            <div className="card-header">
              <h3>MyCarts Availability</h3>
              <button className="btn-primary">Set Availability</button>
            </div>
            <div className="calendar-placeholder">
              <i className="far fa-calendar-alt fa-4x"></i>
              <h4>Availability Calendar</h4>
              <p>Set when your carts are available for bookings</p>
            </div>
          </div>
        )}

        {activeSection === "trips" && (
          <div className="content-card">
            <div className="card-header">
              <h3>My Trips</h3>
              <button className="btn-primary">New Trip</button>
            </div>
            <div className="trip-item">
              <div className="trip-icon">
                <i className="fas fa-route"></i>
              </div>
              <div className="trip-info">
                <div className="trip-title">North Beach to Boardwalk</div>
                <div className="trip-details">Distance: 2.5km | Estimated time: 15min</div>
              </div>
              <span className="status-badge status-completed">Completed</span>
            </div>
          </div>
        )}

        {activeSection === "profile" && (
          <div className="content-card">
            <div className="card-header">
              <h3>My Profile</h3>
            </div>
            <div className="profile-form">
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div className="user-avatar" style={{ width: "80px", height: "80px", fontSize: "34px", margin: "0 auto 15px" }}>
                  <i className="fas fa-user"></i>
                </div>
                <h4>John Doe</h4>
                <p>Beach Valet Operator</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" defaultValue="123456789" />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="John Doe" />
                </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="john.doe@sandhe.com" />
              </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue="Address" />
              </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" defaultValue="City" />
              </div>
                <div className="form-group">
                <label>Driving Licence</label>
                <input type="text" defaultValue="XW123456789"/>
                </div>

                <div className="form-group">
                <label>Photo</label>
                <input type="file" accept="image/*" />
                <small className="form-text text-muted">Upload a profile photo (JPG/PNG)</small>
                </div>

                <div className="form-group">
                <label>Address Proof</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                <small className="form-text text-muted">Upload address proof (PDF/JPG/PNG)</small>
                </div>

                <div className="form-group">
                <label>Licence Photo</label>
                <input type="file" accept="image/*" />
                <small className="form-text text-muted">Upload licence photo (JPG/PNG)</small>
                </div>

              </div>
              <button className="btn-primary" style={{ width: "100%" }}>Update Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}