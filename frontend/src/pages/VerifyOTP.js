import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';
import '../assets/styles/Auth.css'; // Import CSS for styling

const VerifyOTP = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await verifyOTP(userId, otp);
            setSuccess(response.message || 'OTP verified successfully!');

            // Redirect to login page after successful verification
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(
                (error.response && error.response.data && error.response.data.message) ||
                'OTP verification failed. Please try again.'
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Verify OTP</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />
                    <button type="submit" className="auth-button">Verify OTP</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;