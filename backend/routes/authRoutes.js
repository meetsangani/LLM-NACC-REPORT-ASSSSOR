const express = require('express');
const { register, login, getProfile, logout, verifyOTP } = require('../controllers/auth/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Fix import

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Fix middleware usage
router.post('/logout', logout);

module.exports = router;
