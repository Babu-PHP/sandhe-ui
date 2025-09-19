import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spotlight from "../components/Spotlight";
import { AuthContext } from "../AuthContext";
import axios from "axios";

export default function BookPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { isAuthenticated, userContact, login } = useContext(AuthContext);

  // State to manage selected location, truck size, OTP field visibility, and OTP
  const [selectedLocation, setSelectedLocation] = useState("");
  const [truckSize, setTruckSize] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [contact, setContact] = useState("");

  const [userBeaches, setUserBeaches] = useState([]);

  useEffect(() => {
    console.log("userBeaches:", userBeaches); // Debugging
    const fetchData = async () => {
        const response = await axios.get(`http://babusofttech.in/sandhelp/public/api/beaches`);
        setUserBeaches(response.data);
    }

    fetchData();
}, [isAuthenticated, userContact]);
  
  console.log("userBeaches:", userBeaches); // Debugging
  // console.log("beaches:", beaches); // Debugging

  // Default map center and zoom level
  const defaultMapCenter = [33.6891, -78.8867]; // Default center (Myrtle Beach)
  const zoomLevel = 13;

  // Check if the user is already logged in
  useEffect(() => {
    console.log("User contact:", userContact); // Debugging
    if (isAuthenticated && userContact) {
      setContact(userContact); // Populate the contact field
    }

  }, [isAuthenticated, userContact]);

  // beaches = userBeaches;
  // const [beaches, setBeaches] = useState(userBeaches);

  // const beaches2 = userBeaches;

  // List of beaches with their accurate coordinates
  const beaches = userBeaches.length > 0 ? userBeaches : [
    { name: "Myrtle Beach", coordinates: [33.6891, -78.8867] }, // Default beaches array
    { name: "Coligny Beach", coordinates: [32.1574, -80.7431] }, // Default beaches array
  ];

  console.log("userBeaches:", userBeaches); // Debugging
  console.log("beaches:", beaches); // Debugging

  // Handle "Continue" button click
  const handleContinueClick = async () => {
    if (!selectedLocation || !truckSize || !contact) {
      alert("Please fill in all fields.");
      return;
    }

    if (isAuthenticated) {
      // User is already logged in, skip OTP validation
      try {
        const response = await axios.post(`${API_BASE_URL}/check-user`, {
          contact: contact,
        });

        if (response.data) {
          // User exists, redirect to payment info
          login(contact); // Log in the user
          navigate("/payment-info", {
            state: { selectedLocation, truckSize },
          });
        } else {
          login(contact); // Log in the user
          navigate("/contact-info", {
            state: { selectedLocation, truckSize, contact },
          });
        }
      } catch (error) {
        console.error(error);
        alert("Failed to check user existence. Please try again.");
      }
    } else {
      // Check if the user exists
      try {
        const response = await axios.post(`${API_BASE_URL}/check-user`, {
          contact: contact,
        });

        if (response.data) {
          // User exists, redirect to payment info
          login(contact); // Log in the user
          navigate("/payment-info", {
            state: { selectedLocation, truckSize },
          });
        } else {
          // User does not exist, generate and send OTP
          try {
            const otpResponse = await axios.post(`${API_BASE_URL}/generate-otp`, {
              contact: contact,
            });

            if (otpResponse.status === 200) {
              console.log("OTP sent to your contact.");
              setShowOtpField(true); // Show OTP field
            } else {
              console.log("Failed to send OTP. Please try again.");
            }
          } catch (error) {
            console.error(error);
            console.log("Failed to send OTP. Please try again.");
          }
        }
      } catch (error) {
        console.error(error);
        console.log("Failed to check user existence. Please try again.");
      }
    }
  };

  // Handle OTP validation
  const handleOtpValidation = async () => {
    if (!otp) {
      console.log("Please enter OTP!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/validate-otp`, {
        contact: contact,
        otp: otp,
      });

      if (response.data) {

        login(contact); // Log in the user
        navigate("/contact-info", {
          state: { selectedLocation, truckSize, contact },
        });
      } else {
        console.log("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      console.log("OTP validation failed.");
    }
  };

  // Get the coordinates of the selected beach
  const selectedBeach = beaches.find((beach) => beach.name === selectedLocation);
  const mapCenter = selectedBeach ? selectedBeach.coordinates : defaultMapCenter;
  
  return (
    <Container fluid className="px-3 py-4">
      {/* Flex container for the two cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Allow wrapping on smaller screens
          gap: "2rem", // Add space between the cards
          width: "100%", // Ensure the parent takes full width
          justifyContent: "center",
        }}
      >
        {/* Map Card (Left Side) - Conditionally rendered */}
        {selectedLocation && (
          <div className="card1">
            <div
              style={{
                height: "400px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Add a key prop to force re-render when selectedLocation changes */}
              <MapContainer
                key={selectedLocation} // Force re-render when selectedLocation changes
                center={mapCenter}
                zoom={zoomLevel}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapCenter}>
                  <Popup>{selectedLocation}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}

        {/* Form Card (Right Side) */}
        <Card style={{ flex: 1, minWidth: "300px", marginBottom: "1rem" }}>
          <Card.Body>
            <div className="card-button">
              <img src="/book.png" alt="Book" className="button-icon" />
              <span className="button-text">Book</span>
            </div>
            &nbsp;
            <Form>
              {/* Beach Selection Dropdown */}
              <Form.Group controlId="selectedBeach" className="mb-3">
                <Form.Select
                  aria-label="Select Beach"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  required
                >
                  <option value="">Select Beach</option>
                  {beaches.map((beach, index) => (
                    <option key={index} value={beach.name}>
                      {beach.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Truck Size Selection Dropdown */}
              <Form.Group controlId="truckSize" className="mb-3">
                <Form.Select
                  aria-label="Select Truck Size"
                  value={truckSize}
                  onChange={(e) => setTruckSize(e.target.value)}
                  required
                >
                  <option value="">Select Truck Size</option>
                  <option value="Small($9.99)">Small($9.99)</option>
                  <option value="Medium($14.99)">Medium($14.99)</option>
                  <option value="Large($24.99)">Large($24.99)</option>
                </Form.Select>
              </Form.Group>

              {/* Contact Input */}
              <Form.Group controlId="phoneEmail" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Phone or Email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  disabled={isAuthenticated} // Disable if user is already logged in
                />
              </Form.Group>

              {/* Conditionally Render OTP Field */}
              {showOtpField && (
                <Form.Group controlId="otp" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP that was sent to"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {/* Render Validate OTP or Continue Button */}
              {showOtpField ? (
                <Button className="get-started-button" onClick={handleOtpValidation}>
                  Validate OTP
                </Button>
              ) : (
                <Button
                  className="get-started-button"
                  onClick={handleContinueClick}
                  disabled={!selectedLocation || !truckSize || (!isAuthenticated && !contact)}
                >
                  Continue
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Spotlight />
    </Container>
  );
}