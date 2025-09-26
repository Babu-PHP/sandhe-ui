import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Card } from "react-bootstrap";
import { AuthContext } from "../AuthContext"; // Ensure this path is correct

export default function LoginWok() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Hardcoded OTP
  const HARDCODED_OTP = "123456";

  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send OTP (simulate)
  const sendOtp = () => {
    if (!formData.phone) {
      setMessage("Please enter phone/email.");
      return;
    }
    setMessage("OTP sent successfully! (use 123456)");
    setOtpSent(true);
  };

  // Validate OTP (hardcoded)
  const validateOtp = () => {
    if (!formData.otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    if (formData.otp === HARDCODED_OTP) {
      setMessage("OTP validated successfully!");
      login(formData.phone); // update auth state

      // Navigate to Work Dashboard
      navigate("/work-dashboard", {
        state: { phone: formData.phone },
      });
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      sendOtp();
    } else {
      validateOtp();
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }} className="p-4 shadow-lg">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Phone/Email Input */}
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                placeholder="Enter phone/email"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={otpSent}
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
                  <Form.Label>Enter the OTP (hint: 123456)</Form.Label>
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
                  <Button type="submit" className="btn btn-success">
                    Submit
                  </Button>
                </div>
              </>
            )}
          </Form>

          {/* Message */}
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
  );
}