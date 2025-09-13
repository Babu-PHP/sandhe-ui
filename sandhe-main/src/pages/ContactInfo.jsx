import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert } from 'react-bootstrap';
import Spotlight from '../components/Spotlight';
import axios from 'axios';

export default function ContactInfo() {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedLocation, truckSize, contact } = location.state || {
        selectedLocation: 'Location not selected',
        truckSize: 'No truck size selected',
        contact: '', // Default value for contact
    };

    // Contact Information state
    const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        state: '',
        phone: contact && !contact.includes('@') ? contact : '', // Auto-populate phone if contact is not an email
        email: contact && contact.includes('@') ? contact : '', // Auto-populate email if contact is an email
        isBillingDifferent: false, // Add this field
    });

    // Billing Info state (optional)
    const [billingData, setBillingData] = useState({
        billingName: '',
        billingAddress1: '',
        billingAddress2: '',
        billingCity: '',
        billingZipCode: '',
        billingState: '',
    });

    const [isBillingDifferent, setIsBillingDifferent] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Handle contact form changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle billing form changes
    const handleBillingChange = (e) => {
        const { id, value } = e.target;
        setBillingData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Validate contact information
    const validateContactInfo = () => {
        const { name, address1, city, zipCode, state, phone, email } = formData;

        if (!name || !address1 || !city || !zipCode || !state || !phone || !email) {
            setValidationError('All fields are required.');
            return false;
        }

        // Validate phone number (example: 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setValidationError('Please enter a valid 10-digit phone number.');
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        setValidationError(''); // Clear validation error
        return true;
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;

        // Update the formData state
        setFormData((prevData) => ({
            ...prevData,
            isBillingDifferent: isChecked,
        }));

        // Show billing information if checkbox is checked
        setIsBillingDifferent(isChecked);
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate contact information
        if (!validateContactInfo()) {
            return; // Stop if validation fails
        }

        setIsLoading(true); // Start loading
        setValidationError(''); // Clear validation error

        try {
            // Prepare the data to send to the backend
            const userData = {
                contact: formData.email || formData.phone, // Use email or phone as the contact
                selectedLocation,
                truckSize,
                contactInfo: formData, // Include isBillingDifferent in contactInfo
                billingInfo: isBillingDifferent ? billingData : null, // Include billing info if checkbox is checked
            };

            // Call the backend API to save the data
            const response = await axios.post(`${API_BASE_URL}/save-user-info`, userData);

            if (response.status === 200) {
                // Navigate to PaymentInfo page with selectedLocation, truckSize, and other data
                navigate('/payment-info', {
                    state: {
                        selectedLocation,
                        truckSize,
                        contactInfo: formData,
                        billingInfo: isBillingDifferent ? billingData : null, // Pass billing info only if checkbox is checked
                    },
                });
            } else {
                setValidationError('Failed to save user information. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setValidationError('Failed to save user information. Please try again.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <Container fluid className="px-3 py-4">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', justifyContent: 'center' }}>
                {/* Conditionally render Contact Information or Billing Information card */}
                {!isBillingDifferent ? (
                    <div className="card1">
                        <Card.Body>
                            <h3>Contact Information</h3>
                            &nbsp;
                            {/* Display validation error if any */}
                            {validationError && (
                                <Alert variant="danger" className="mb-3">
                                    {validationError}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="address1" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Address line 1"
                                        value={formData.address1}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="address2" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Address line 2 (optional)"
                                        value={formData.address2}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="zipCode"
                                            placeholder="Zip code"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="state"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="phone" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!!contact && !contact.includes('@')} // Disable if contact is a phone number
                                    />
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!!contact && contact.includes('@')} // Disable if contact is an email
                                    />
                                </Form.Group>

                                {/* Billing Checkbox */}
                                <Form.Group controlId="billingDifferent" className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Billing information is different from contact information"
                                        checked={formData.isBillingDifferent}
                                        onChange={handleCheckboxChange}
                                    />
                                </Form.Group>
                                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                    <Button type="submit" className="get-started-button" disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Continue'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </div>
                ) : (
                    <div className="card1">
                        <Card.Body>
                            <h3>Billing Information</h3>
                            &nbsp;
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="billingName" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Billing Name"
                                        value={billingData.billingName}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="billingAddress1" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Billing Address Line 1"
                                        value={billingData.billingAddress1}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="billingAddress2" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Billing Address Line 2 (Optional)"
                                        value={billingData.billingAddress2}
                                        onChange={handleBillingChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="billingZipCode"
                                            placeholder="Zip Code"
                                            value={billingData.billingZipCode}
                                            onChange={handleBillingChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="billingState"
                                            placeholder="State"
                                            value={billingData.billingState}
                                            onChange={handleBillingChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Form.Control
                                            type="text"
                                            id="billingCity"
                                            placeholder="City"
                                            value={billingData.billingCity}
                                            onChange={handleBillingChange}
                                            required
                                        />
                                    </div>
                                </Form.Group>
                                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                    <Button type="submit" className="get-started-button" disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Continue'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </div>
                )}

                {/* Service Summary */}
                <Card style={{ flex: 1, minWidth: '300px', marginBottom: '1rem' }}>
                    <Card.Body>
                        <div className="card-button">
                            <img src="/book.png" alt="Book" className="button-icon" />
                            <span className="button-text">Book</span>
                        </div>
                        &nbsp;
                        <div className="mb-3">
                            <strong>Selected Location: </strong> {selectedLocation}
                        </div>
                        <div className="mb-3">
                            <strong>Truck Size: </strong> {truckSize}
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Spotlight />
        </Container>
    );
}