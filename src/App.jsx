import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./components/pages/home";
import Services from "./components/pages/Services";
import About from "./components/pages/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/auth/Login.jsx";
import Dashboard from "./components/auth/Dashboard.jsx";
import { 
  getGrampanchayat,
  logoutGrampanchayat,
  clearGrampanchayatErrors,
  clearGrampanchayatMessages 
} from "./components/store/slices/grampanchayatSlice";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get auth state from Redux store
  const { 
    isAuthenticated,
    grampanchayat,
    loading,
    error,
    message 
  } = useSelector((state) => state.grampanchayatAuth);

  // UI state management
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [showFooter, setShowFooter] = React.useState(false);

  // Load grampanchayat data if authenticated
  useEffect(() => {
    const token = localStorage.getItem("grampanchayatToken");
    if (token) {
      dispatch(getGrampanchayat());
    }
  }, [dispatch]);

  // Clear errors and messages when route changes
  useEffect(() => {
    dispatch(clearGrampanchayatErrors());
    dispatch(clearGrampanchayatMessages());
  }, [dispatch, location]);

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutGrampanchayat());
  };

  // Handle navbar visibility based on scroll and route
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const homeSection = document.getElementById('home');
        const footerSection = document.getElementById('footer');
        
        if (homeSection && footerSection) {
          const homeHeight = homeSection.clientHeight;
          const footerTop = footerSection.offsetTop;
          
          setShowNavbar(window.scrollY < homeHeight);
          setShowFooter(window.scrollY >= footerTop - window.innerHeight);
        }
      }
    };
    
    // Update navbar visibility based on route
    if (location.pathname === '/login' || location.pathname === '/dashboard') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      {showNavbar && (
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
          grampanchayat={grampanchayat}
        />
      )}

      {/* Show error/success messages */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 text-center">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-100 text-green-700 p-3 text-center">
          {message}
        </div>
      )}

      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Dashboard grampanchayat={grampanchayat} />
              </div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <>
              <section id="home" className="section">
                <Home isAuthenticated={isAuthenticated} />
              </section>
              
              <section id="services" className="section">
                <Services />
              </section>
              
              <section id="about" className="section">
                <About />
              </section>
              
              <section id="contact" className="section">
                <Contact />
              </section>
              
              <section id="footer" className="section">
                {showFooter && <Footer />}
              </section>
            </>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;