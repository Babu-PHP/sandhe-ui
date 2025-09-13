import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert } from 'react-bootstrap';
import Spotlight from '../components/Spotlight';

export default function PaymentInfo() {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve data passed from ContactInfo page
    const { selectedLocation, truckSize, contactInfo, billingInfo } = location.state || {
        selectedLocation: 'Location not selected',
        truckSize: 'No truck size selected',
        contactInfo: {},
        billingInfo: null,
    };

    // State to manage payment form inputs
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    // State to manage validation errors
    const [validationError, setValidationError] = useState('');

    // Handle payment form changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Format card number (add spaces every 4 digits)
        if (id === 'cardNumber') {
            const formattedCardNumber = value
                .replace(/\s/g, '') // Remove existing spaces
                .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
                .trim(); // Remove trailing space
            setPaymentData((prevData) => ({
                ...prevData,
                [id]: formattedCardNumber,
            }));
        }
        // Format expiry date (add / after 2 digits)
        else if (id === 'expiryDate') {
            const formattedExpiryDate = value
                .replace(/\D/g, '') // Remove non-digits
                .replace(/(\d{2})(\d{0,2})/, '$1/$2') // Add / after 2 digits
                .substring(0, 5); // Limit to MM/YY format
            setPaymentData((prevData) => ({
                ...prevData,
                [id]: formattedExpiryDate,
            }));
        }
        // Handle other fields normally
        else {
            setPaymentData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    // Validate payment information
    const validatePaymentInfo = () => {
        const { cardName, cardNumber, expiryDate, cvv } = paymentData;

        // Check if all fields are filled
        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            setValidationError('All fields are required.');
            return false;
        }

        // Validate card number (16 digits without spaces)
        const cardNumberRegex = /^\d{16}$/;
        const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, ''); // Remove spaces for validation
        if (!cardNumberRegex.test(cardNumberWithoutSpaces)) {
            setValidationError('Please enter a valid 16-digit card number.');
            return false;
        }

        // Validate expiry date (format: MM/YY)
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryDateRegex.test(expiryDate)) {
            setValidationError('Please enter a valid expiry date (MM/YY).');
            return false;
        }

        // Validate CVV (3 or 4 digits)
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(cvv)) {
            setValidationError('Please enter a valid CVV (3 or 4 digits).');
            return false;
        }

        setValidationError(''); // Clear validation error
        return true;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate payment information
        if (!validatePaymentInfo()) {
            return; // Stop if validation fails
        }

        console.log('Payment Info:', paymentData);

        // Navigate to the summary page with all data
        navigate('/summary', {
            state: {
                selectedLocation,
                truckSize,
                contactInfo,
                billingInfo,
                paymentData,
            },
        });
    };

    return (
        <Container fluid className="px-3 py-4">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', justifyContent: 'center' }}>
                {/* Payment Information Form */}
                <div className="card1">
                    <Card.Body>
                        <h3>Payment Information</h3>
                        &nbsp;
                        {/* Display validation error if any */}
                        {validationError && (
                            <Alert variant="danger" className="mb-3">
                                {validationError}
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="cardName" className="mb-3">
                                <Form.Label>Cardholder Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter cardholder name"
                                    value={paymentData.cardName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="cardNumber" className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={paymentData.cardNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentData.expiryDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control
                                        type="password" // CVV in password format
                                        id="cvv"
                                        placeholder="CVV"
                                        value={paymentData.cvv}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                <Button type="submit" className="get-started-button">
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </div>

                {/* Service Summary */}
                <Card style={{ flex: 1, minWidth: '300px', marginBottom: '1rem' }}>
                    <Card.Body>
                        <div className="card-button" >
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