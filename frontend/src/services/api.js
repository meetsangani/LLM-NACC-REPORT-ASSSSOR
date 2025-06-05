import axios from 'axios';

// filepath: d:\Hackathon\LLM-NAAC-Report-Assessor\frontend\src\services\api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration API Error:', error.response?.data || error.message);
        
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Network error: Unable to reach server');
        } else {
            // Something else happened
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
};

export const verifyOTP = async (userId, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/verify-otp`, { userId, otp });
        return response.data;
    } catch (error) {
        console.error('OTP Verification API Error:', error.response?.data || error.message);
        
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach server');
        } else {
            throw new Error(error.message || 'Unknown error occurred');
        }
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
}, error => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, userData);
        if (response.data.message === 'Please verify your email address before logging in') {
            return { unverified: true, userId: response.data.userId };
        }
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error.response?.data || error.message);
        
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach server');
        } else {
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
};

export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await api.get('/api/v1/auth/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Reset Password Email API Error:', error.response?.data || error.message);
        
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach server');
        } else {
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Reset Password API Error:', error.response?.data || error.message);
        
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach server');
        } else {
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
};

export const uploadReport = async (formData) => {
    try {
        const response = await api.post(`/api/v1/reports/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        });
        return response.data;
    } catch (error) {
        console.error('Upload Report API Error:', error.response?.data || error.message);
        
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(data?.message || `Server error: ${status}`);
        } else if (error.request) {
            throw new Error('Network error: Unable to reach server');
        } else {
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
};