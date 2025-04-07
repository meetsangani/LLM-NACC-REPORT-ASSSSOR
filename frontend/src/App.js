import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import theme from './assets/styles/theme';
import Home from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Criterion1 from './pages/Criterion1';
import Criterion2 from './pages/Criterion2';
import Criterion3 from './pages/Criterion3';
import Criterion4 from './pages/Criterion4';
import Criterion5 from './pages/Criterion5';
import Criterion6 from './pages/Criterion6';
import Criterion7 from './pages/Criterion7';
import Report from './pages/Report';
import LLMAnalysis from './pages/LLMAnalysis';
import UploadReports from './pages/UploadReports';
import AIAnalysis from './pages/AIAnalysis';
import Improvement from './pages/Improvement';
import ProgressTracking from './pages/ProgressTracking';
import Profile from './pages/profile';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return children;
};

// AppContent component to handle routes and authentication
function AppContent({ isAuthenticated, setIsAuthenticated }) {
  return (
    <div className="App">
      {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />}
      <main className="container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp/:userId" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Navigate to="/login" />
          } />
          <Route path="/home" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/llm-analysis" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LLMAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/upload-reports" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UploadReports />
            </ProtectedRoute>
          } />
          <Route path="/ai-analysis" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AIAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Report />
            </ProtectedRoute>
          } />
          <Route path="/improvement" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Improvement />
            </ProtectedRoute>
          } />
          <Route path="/progress-tracking" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProgressTracking />
            </ProtectedRoute>
          } />
          
          {/* All other routes - redirect to login if not authenticated */}
          <Route path="*" element={
            isAuthenticated ? 
            <NotFoundPage /> : 
            <Navigate to="/login" />
          } />
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token; // Convert to boolean
  });

  useEffect(() => {
    // Check for token on mount and when isAuthenticated changes
    const token = localStorage.getItem('token');
    if (token !== null && !isAuthenticated) {
      setIsAuthenticated(true);
    } else if (token === null && isAuthenticated) {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </ThemeProvider>
  );
}

export default App;