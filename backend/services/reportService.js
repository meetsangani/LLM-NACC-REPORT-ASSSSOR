const Report = require('../models/report/Report');

exports.createReport = async (reportData) => {
    try {
        const report = new Report(reportData);
        await report.save();
        return report;
    } catch (error) {
        throw new Error('Error creating report: ' + error.message);
    }
};

exports.getReportById = async (reportId) => {
    try {
        const report = await Report.findById(reportId);
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    } catch (error) {
        throw new Error('Error fetching report: ' + error.message);
    }
};

exports.updateReport = async (reportId, updateData) => {
    try {
        const report = await Report.findByIdAndUpdate(reportId, updateData, { new: true });
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    } catch (error) {
        throw new Error('Error updating report: ' + error.message);
    }
};

exports.deleteReport = async (reportId) => {
    try {
        const report = await Report.findByIdAndDelete(reportId);
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    } catch (error) {
        throw new Error('Error deleting report: ' + error.message);
    }
};

exports.getAllReports = async () => {
    try {
        return await Report.find();
    } catch (error) {
        throw new Error('Error fetching reports: ' + error.message);
    }
};