// Header.js
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    console.log('isAuthenticated: ', isAuthenticated);

    return (
        <Navbar>
            <Container>
                <Link to="/" className="navbar-brand">
                    <img
                        src="/sandhe-logo.jpeg" // Replace with your logo path
                        alt="Logo"
                        width="30"
                        height="70"
                        className="d-inline-block align-top"
                    />{' '}
                </Link>

                {/* Hamburger Menu for Mobile */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                {/* Navigation Links */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="nav-link">
                                    <Button variant="outline-primary" size="ms" className="me-2">
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/" className="nav-link">
                                    <Button variant="primary" size="ms">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/" className="nav-link">
                                <Button variant="primary" size="ms" onClick={logout}>
                                    Sign Out
                                </Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}