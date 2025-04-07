const Report = require('../../models/report/Report');
const fs = require('fs');
const path = require('path');

// Create a new report
exports.createReport = async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Upload a report file (PDF)
exports.uploadReportFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new report entry in the database
        const report = new Report({
            title: req.body.fileName || req.file.originalname,
            description: req.body.description || 'Uploaded NAAC report',
            author: req.body.author || req.user?._id || '64f5a7e5e85648a4c8b114a8', // Default or logged in user
            data: {
                filePath: req.file.path,
                fileSize: req.file.size,
                fileType: req.file.mimetype,
                originalName: req.file.originalname
            }
        });

        await report.save();

        // Schedule the analysis process (this would be implemented separately)
        // analysisQueue.add({ reportId: report._id });

        res.status(201).json({
            message: 'Report uploaded successfully',
            id: report._id,
            fileName: req.file.originalname,
            fileSize: req.file.size
        });
    } catch (error) {
        // If there's an error, clean up the uploaded file
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (err) {
                console.error('Error deleting file:', err);
            }
        }
        
        res.status(500).json({ message: error.message });
    }
};

// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a report by ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a report by ID
exports.updateReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a report by ID
exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};