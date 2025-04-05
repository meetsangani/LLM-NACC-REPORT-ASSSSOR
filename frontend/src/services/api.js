import axios from 'axios';

// filepath: d:\Hackathon\LLM-NAAC-Report-Assessor\frontend\src\services\api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const verifyOTP = async (userId, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/verify-otp`, { userId, otp });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Create an instance of axios with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token if available
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, userData);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getUserProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};