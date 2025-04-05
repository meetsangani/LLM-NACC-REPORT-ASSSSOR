const express = require('express');
const authController = require('../../../controllers/auth/authController');
const { authMiddleware } = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register); // Registration route
router.post('/verify-otp', authController.verifyOTP); // OTP verification route (no authMiddleware here)
router.post('/login', authController.login); // Login route
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile); // Ensure this route is defined and protected
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;