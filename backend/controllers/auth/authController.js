const User = require('../../models/auth/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import nodemailer
const crypto = require('crypto'); // Import crypto

// Nodemailer transporter setup with better configuration
const createTransporter = () => {
    // Check if email credentials are properly configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email credentials not configured. Email features will be disabled.');
        return null;
    }

    return nodemailer.createTransport({
        service: 'gmail', // Use service instead of manual host/port
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // This should be an App Password, not regular password
        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
        }
    });
};

const transporter = createTransporter();

const register = async (req, res) => {
    const { name, email, password, username } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now() + 3600000; // OTP expires in 1 hour

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
            otp,
            otpExpiry,
            isVerified: false,
        });

        // Save user first
        await newUser.save();

        // Try to send OTP via email if transporter is available
        if (transporter) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify Your Email - LLM NAAC Report Assessor',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Email Verification</h2>
                        <p>Hello ${name},</p>
                        <p>Thank you for registering with LLM NAAC Report Assessor. Please use the following OTP to verify your email address:</p>
                        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #007bff; margin: 0;">${otp}</h1>
                        </div>
                        <p>This OTP will expire in 1 hour.</p>
                        <p>If you didn't create this account, please ignore this email.</p>
                    </div>
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('OTP email sent successfully to:', email);
                
                res.status(201).json({
                    message: 'User registered successfully. Please check your email for OTP verification.',
                    userId: newUser._id,
                    otpSent: true,
                });
            } catch (sendError) {
                console.error('Error sending email:', sendError);
                
                // Delete the user if email sending fails to prevent orphaned accounts
                await User.findByIdAndDelete(newUser._id);
                
                // Check for specific Gmail auth errors
                if (sendError.message.includes('Invalid login') || sendError.code === 'EAUTH') {
                    return res.status(500).json({
                        message: 'Email service configuration error. Please contact administrator.',
                        error: 'Email authentication failed'
                    });
                }
                
                return res.status(500).json({
                    message: 'Registration failed due to email service error. Please try again.',
                    error: 'Email service temporarily unavailable'
                });
            }
        } else {
            // No email service configured - for development/testing
            console.warn('Email service not configured. User registered with OTP:', otp);
            res.status(201).json({
                message: 'User registered successfully. Email service not configured.',
                userId: newUser._id,
                otpSent: false,
                // Only show OTP in development mode
                developmentOtp: process.env.NODE_ENV === 'development' ? otp : undefined
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.', error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        // Don't generate token here - user should log in after verification
        res.status(200).json({ message: 'Email verified successfully. You can now login.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ 
                message: 'Please verify your email address before logging in',
                userId: user._id 
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            username: req.user.username,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout a user
const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        if (transporter) {
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request - LLM NAAC Report Assessor',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>You requested a password reset for your LLM NAAC Report Assessor account.</p>
                        <p>Click the button below to reset your password:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                        </div>
                        <p>Or copy and paste this link into your browser:</p>
                        <p><a href="${resetUrl}">${resetUrl}</a></p>
                        <p>This link will expire in 1 hour.</p>
                        <p>If you didn't request this password reset, please ignore this email.</p>
                    </div>
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Password reset email sent successfully.' });
            } catch (sendError) {
                console.error('Error sending password reset email:', sendError);
                res.status(500).json({ 
                    message: 'Password reset token generated, but email could not be sent. Please contact administrator.',
                    emailError: 'Email service temporarily unavailable'
                });
            }
        } else {
            res.status(500).json({ 
                message: 'Email service not configured. Please contact administrator for password reset.',
                resetToken: process.env.NODE_ENV === 'development' ? token : undefined
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing password reset request.', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password.', error: error.message });
    }
};

module.exports = { register, login, getProfile, logout, verifyOTP, forgotPassword, resetPassword };