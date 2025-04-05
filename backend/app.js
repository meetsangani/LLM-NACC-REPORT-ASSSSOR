// filepath: d:\Hackathon\LLM-NAAC-Report-Assessor\backend\app.js
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/api/v1/authRoutes');
const studentRoutes = require('./routes/api/v1/studentRoutes');
const teacherRoutes = require('./routes/api/v1/teacherRoutes');
const placementRoutes = require('./routes/api/v1/placementRoutes');
const analysisRoutes = require('./routes/api/v1/analysisRoutes');
const infrastructureRoutes = require('./routes/api/v1/infrastructureRoutes');
const governanceRoutes = require('./routes/api/v1/governanceRoutes');
const developerAdminRoutes = require('./routes/api/v1/developerAdminRoutes');
const courseRoutes = require('./routes/api/v1/courseRoutes');

const app = express();

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

connectDB();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes); // Ensure this line is present
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/placements', placementRoutes);
app.use('/api/v1/analysis', analysisRoutes);
app.use('/api/v1/infrastructure', infrastructureRoutes);
app.use('/api/v1/governance', governanceRoutes);
app.use('/api/v1/developer-admin', developerAdminRoutes);
app.use('/api/v1/courses', courseRoutes);

app.use(errorMiddleware);

module.exports = app; // Export the app