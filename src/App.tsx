import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CertificateVerification from "./pages/CertificateVerification";
import ClientDetails from "./pages/ClientDetails";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />{" "}
          <Route
            path="/services"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/clients"
            element={
              <Layout>
                <Clients />
              </Layout>
            }
          />
          <Route
            path="/clients/:client"
            element={
              <Layout>
                <ClientDetails />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <Careers />
              </Layout>
            }
          />
          <Route
            path="/services/:serviceId"
            element={
              <Layout>
                <ServiceDetail />
              </Layout>
            }
          />
          {/* Certificate Verification - Public Route without Layout */}
          <Route path="/verify" element={<CertificateVerification />} />
          {/* Admin Routes - No Layout */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* 404 Page - Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
