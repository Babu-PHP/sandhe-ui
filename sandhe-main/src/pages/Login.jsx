import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Card } from "react-bootstrap";
import { AuthContext } from "../AuthContext"; // Ensure this path is correct
import axios from "axios";

export default function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [message, setMessage] = useState(""); // Store success/error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Send OTP API call
  const sendOtp = async () => {
    if (!formData.phone) {
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-otp`, {
        contact: formData.phone, // Send phone/email to backend
      });

      if (response.status === 200) {
        setMessage("OTP sent successfully!");
        setOtpSent(true); // Enable OTP input field
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP. Please check backend.");
    }
  };

  // Validate OTP API call
  const validateOtp = async () => {
    if (!formData.otp) {
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/validate-otp`, {
        contact: formData.phone, // Send phone/email to backend
        otp: formData.otp, // Send OTP to backend
      });

      if (response.status === 200) {
        setMessage("OTP validated successfully!");
        login(formData.phone); // Update authentication state

        // Redirect to another page and pass the phone value
        navigate("/", {
          state: { phone: formData.phone }, // Pass phone as state
        });
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("OTP validation failed.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      sendOtp(); // First submission sends OTP
    } else {
      validateOtp(); // After OTP sent, submission validates OTP
    }
  };

  // Resend OTP
  const handleDidnotReceiveCodeClick = () => {
    sendOtp();
  };

  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: "400px" }} className="p-4 shadow-lg">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Phone/Email Input */}
              <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                  type="text"
                  placeholder="Please enter phone number or email"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={otpSent} // Disable input after OTP is sent
                />
              </Form.Group>

              {/* Send OTP Button */}
              {!otpSent && (
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Send OTP
                </Button>
              )}

              {/* OTP Input */}
              {otpSent && (
                <>
                  <Form.Group className="mb-3" controlId="formOtp">
                    <Form.Label>Enter the code that was sent to</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <Button
                      className="get-started-button"
                      onClick={handleDidnotReceiveCodeClick}
                      type="button"
                    >
                      Didn't Receive Code?
                    </Button>
                    <Button className="get-started-button" type="submit">
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </Form>

            {/* Display success/error messages */}
            {message && (
              <p
                style={{
                  color: message.includes("success") ? "green" : "red",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {message}
              </p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}