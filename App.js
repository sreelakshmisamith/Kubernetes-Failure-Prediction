import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Anomalies from "./pages/Anomalies";
import Contact from "./pages/Contact";
import Issues from "./pages/Issues";
import Settings from "./pages/Settings";
import AuthCard from "./components/AuthCard"; // ✅ Login/Signup

const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/auth" replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <MainLayout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route path="/auth" element={<AuthCard setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} isLoggedIn={isLoggedIn} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />} />
          <Route path="/anomalies" element={<PrivateRoute element={<Anomalies />} isLoggedIn={isLoggedIn} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} isLoggedIn={isLoggedIn} />} />
          <Route path="/issues" element={<PrivateRoute element={<Issues />} isLoggedIn={isLoggedIn} />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} isLoggedIn={isLoggedIn} />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/auth"} replace />} />

        </Routes>
      </MainLayout>
    </Router>
  );
}

// ✅ Keeps Navbar outside Routes for consistent rendering
const MainLayout = ({ children, isLoggedIn }) => {
  const location = useLocation();
  return (
    <div>
      {isLoggedIn && location.pathname !== "/auth" && <Navbar />}
      {children}
    </div>
  );

};

export default App;

