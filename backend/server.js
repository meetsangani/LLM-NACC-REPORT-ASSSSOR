const express = require('express');
const app = require('./app'); // Use the app from app.js
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/api/v1/authRoutes');

dotenv.config();
connectDB();

const port = process.env.PORT || 3000; // Ensure this uses the .env value

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const analysisRoutes = require('./routes/api/v1/analysisRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/analysis', analysisRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});