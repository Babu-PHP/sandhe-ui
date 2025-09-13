import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import ErrorBoundary from './ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import ContactInfo from './pages/ContactInfo';
import PaymentInfo from './pages/PaymentInfo';
import Summary from './pages/Summary';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/contact-info" element={<ContactInfo />} />
              <Route path="/payment-info" element={<PaymentInfo />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}