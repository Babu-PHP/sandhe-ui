import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Spotlight from '../components/Spotlight';
import { Image } from 'react-bootstrap';

export default function Summary() {
    const location = useLocation();

    // Default map center and zoom level
    const mapCenter = [51.505, -0.09]; // Replace with your desired coordinates
    const zoomLevel = 13;

    // Retrieve data passed from PaymentInfo page
    const { selectedLocation, truckSize, contactInfo, billingInfo, paymentData } = location.state || {
        selectedLocation: 'Location not selected',
        truckSize: 'No truck size selected',
        contactInfo: {},
        billingInfo: null,
        paymentData: {},
    };

    // Dummy valet name and ETA
    const valetName = 'Billy Joe Jim Bob Smith Jr';
    const etaMinutes = 15; // Example ETA in minutes

    // State to manage whether the user has clicked "I am here"
    const [isArrived, setIsArrived] = useState(false);

    // Transaction reference number
    const transactionId = 'cb-20230226-113502-0001'; // Example transaction ID

    // Handle "I am here" button click
    const handleArrivalClick = () => {
        setIsArrived(true); // Set state to show valet image and transaction ID
    };

    return (
        <Container fluid className="px-3 py-4">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', justifyContent: 'center' }}>
                {/* Summary Message */}
                {/* Map Card (Left Side) */}
                <div className="card1">
                    <div
                        style={{
                            height: '400px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        }}
                    >
                        <MapContainer
                            center={mapCenter}
                            zoom={zoomLevel}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={mapCenter}>
                                <Popup>Your location.</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                {/* Service Summary */}
                <Card style={{ flex: 1, minWidth: '300px' }}>
                    <Card.Body>
                        <div className="card-button" >
                            <img src="/book.png" alt="Book" className="button-icon" />
                            <span className="button-text">Book</span>
                        </div>
                        &nbsp;
                        <h4 style={{ textAlign: 'center' }}>Your Personal Valet is on the Way


                            {valetName} is {etaMinutes} minutes away.
                        </h4>
                        &nbsp;

                        {/* "I am here" button */}
                        {!isArrived ? (
                            <div style={{ textAlign: 'center' }}>
                                <h6 style={{ textAlign: 'center' }}>Let us know when you have arrived.</h6><br></br>
                                <Button className="get-started-button" onClick={handleArrivalClick}>
                                    I am here
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {/* Valet Image */}
                                <Image
                                    src="/preview.jpg" // Replace with your valet image path
                                    alt="Valet"
                                    fluid
                                    style={{ maxWidth: '40%', height: 'auto', marginBottom: '1rem' }}
                                />

                                {/* Transaction Reference Number */}
                                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    Transaction ID: {transactionId}
                                </p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
            <Spotlight />
        </Container>
    );
}