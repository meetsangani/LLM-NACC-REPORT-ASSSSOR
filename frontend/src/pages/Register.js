import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/styles/Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', username: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Add showPassword state
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await registerUser(formData);
            
            if (response.otpSent) {
                setSuccess(response.message || 'Registration successful! Please verify your OTP.');
                setFormData({ name: '', email: '', password: '', username: '' });
                // Redirect to OTP verification page after successful registration
                navigate(`/verify-otp/${response.userId}`);
            } else if (response.developmentOtp) {
                // Development mode - show OTP directly
                setSuccess(`Registration successful! Development OTP: ${response.developmentOtp}. Please verify your account.`);
                navigate(`/verify-otp/${response.userId}`);
            } else {
                // Email service not configured or failed
                setError(response.message || "Registration completed but email service is not available. Please contact administrator for OTP.");
            }
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle different types of errors
            if (error.message.includes('Email service configuration error')) {
                setError('Registration failed: Email service is not properly configured. Please contact administrator.');
            } else if (error.message.includes('Email service temporarily unavailable')) {
                setError('Registration failed: Email service is temporarily unavailable. Please try again later.');
            } else {
                setError(error.message || 'Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="header-line"></div>
            <div className="auth-container">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"} // Add showPassword toggle
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)} // Add eye icon to toggle password visibility
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;