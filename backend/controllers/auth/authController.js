const User = require('../../models/auth/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import nodemailer
const crypto = require('crypto'); // Import crypto

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 587, // TLS port
    secure: false, // Use TLS (secure: false for port 587)
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
    debug: true, // Enable debugging
    logger: true, // Enable logging
});

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

        // Create a new user (but don't save yet)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
            otp,
            otpExpiry,
            isVerified: false, // User is not verified initially
        });

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Your OTP for email verification is: <b>${otp}</b>. It will expire in 1 hour.</p>`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);

            // Save the user with OTP details
            await newUser.save();
            res.status(201).json({
                message: 'User registered successfully. Please check your email for OTP verification.',
                userId: newUser._id,
                otpSent: true,
            });
        } catch (sendError) {
            console.error('Error sending email:', sendError);
            return res.status(500).json({
                message: 'Error sending OTP email. Please check your email configuration and network connectivity.',
                error: sendError.message,
            });
        }
    } catch (error) {
        console.error(error);
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

        res.status(200).json({ message: 'OTP verified successfully. You can now login.' });
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
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout a user
const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { register, login, getProfile, logout, verifyOTP };