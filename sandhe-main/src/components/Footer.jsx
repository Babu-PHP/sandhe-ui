
import { Container, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar fixed="bottom" className="py-2">
      <Container className="d-flex justify-content-center align-items-center">
        <span className="text-dark text-center fs-6">
          <p>&copy; Copyright © SandHE {new Date().getFullYear()}.</p>
        </span>
      </Container>
    </Navbar>
  );
}