const express = require('express');
const { register, login, getProfile, logout, verifyOTP } = require('../controllers/auth/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);

router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', logout);
router.post('/verify-otp', verifyOTP);

module.exports = router;
