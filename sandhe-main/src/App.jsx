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
import WorkPage from './pages/WorkPage';
import LoginWok from './pages/LoginWok';
import WorkDashboard from './pages/WorkDashboard';
import BookPageStart from './pages/BookPageStart';
// import AddCart from './pages/AddCart';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bookStart" element={<BookPageStart />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginWok" element={<LoginWok />} />
              <Route path="/work-dashboard" element={<WorkDashboard />} />
              {/* <Route path="/add-cart" element={<AddCart />} /> */}
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