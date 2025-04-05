const express = require('express');
const { register, login, getProfile, logout, verifyOTP } = require('../../../controllers/auth/authController');
const { authMiddleware } = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register); // Registration route
router.post('/verify-otp', verifyOTP); // OTP verification route (no authMiddleware here)
router.post('/login', login); // Login route

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.post('/logout', authMiddleware, logout);

module.exports = router;