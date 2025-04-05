// filepath: d:\Hackathon\LLM-NAAC-Report-Assessor\frontend\src\pages\Login.js
import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/Auth.css';

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
    const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Generate a new CAPTCHA on component mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Function to generate a simple math CAPTCHA
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
        const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
        const answer = num1 + num2;
        setCaptcha({ num1, num2, answer: answer.toString() });
        setUserCaptchaAnswer(''); // Reset user input
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaChange = (e) => {
        setUserCaptchaAnswer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Verify CAPTCHA
        if (userCaptchaAnswer !== captcha.answer) {
            setError('Invalid CAPTCHA answer. Please try again.');
            generateCaptcha(); // Generate a new CAPTCHA after failed attempt
            return;
        }

        try {
            // No need to include reCAPTCHA token
            const response = await loginUser(formData);
            setSuccess(response.message || 'Login successful!');
            localStorage.setItem('token', response.token); // Save the token
            setAuth(true);

            const redirectPath = location.state?.from || '/';
            setTimeout(() => {
                navigate(redirectPath);
            }, 2000);
        } catch (error) {
            setError(
                (error.response && error.response.data && error.response.data.message) ||
                'Login failed. Please try again.'
            );
            generateCaptcha(); // Generate a new CAPTCHA after failed login
        }
    };

    return (
        <div className="auth-page">
            <div className="header-line"></div>
            <div className="auth-container">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    
                    {/* CAPTCHA Section */}
                    <div className="captcha-container">
                        <div className="captcha-challenge">
                            <span>What is {captcha.num1} + {captcha.num2}?</span>
                            <button 
                                type="button" 
                                className="refresh-captcha"
                                onClick={generateCaptcha}
                            >
                                ↻
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter the answer"
                            value={userCaptchaAnswer}
                            onChange={handleCaptchaChange}
                            required
                        />
                    </div>
                    
                    <button type="submit">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
                <p className="forgot-password-link">
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
            </div>
        </div>
    );
};

export default Login;