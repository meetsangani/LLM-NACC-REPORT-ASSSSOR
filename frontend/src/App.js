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
import VerifyOTP from './pages/VerifyOTP'; // Import VerifyOTP
import ForgotPassword from './pages/ForgotPassword'; // Import ForgotPassword
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

// AppContent component to handle routes and authentication
function AppContent({ isAuthenticated, setIsAuthenticated }) {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="App">
            {!isAuthPage && <Header />}
            <main className="container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-otp/:userId" element={<VerifyOTP />} /> {/* Add this line */}
                    <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add ForgotPassword route */}

                    {/* Private Routes */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/upload" element={<Report />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/criterion-1" element={<Criterion1 />} />
                            <Route path="/criterion-2" element={<Criterion2 />} />
                            <Route path="/criterion-3" element={<Criterion3 />} />
                            <Route path="/criterion-4" element={<Criterion4 />} />
                            <Route path="/criterion-5" element={<Criterion5 />} />
                            <Route path="/criterion-6" element={<Criterion6 />} />
                            <Route path="/criterion-7" element={<Criterion7 />} />
                            <Route path="/llm-analysis" element={<LLMAnalysis />} />
                            <Route path="/upload-reports" element={<UploadReports />} />
                            <Route path="/ai-analysis" element={<AIAnalysis />} />
                            <Route path="/improvement" element={<Improvement />} />
                            <Route path="/progress-tracking" element={<ProgressTracking />} />
                            <Route path="/profile" element={<Profile />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" state={{ from: location }} />} />
                    )}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Get the authentication state from local storage on initial load
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        // Update local storage whenever the authentication state changes
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
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