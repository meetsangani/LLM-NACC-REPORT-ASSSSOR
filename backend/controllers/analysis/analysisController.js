const AnalysisService = require('../../services/analysisService');

exports.performLLMAnalysis = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: 'Text is required for analysis.' });
        }

        const analysisResult = await AnalysisService.performLLMAnalysis(text);
        res.status(200).json({ success: true, result: analysisResult });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error performing analysis', error: error.message });
    }
};

exports.performAnalysis = async (req, res) => {
    try {
        const data = req.body;
        const analysisResult = await AnalysisService.performAnalysis(data);
        res.status(201).json(analysisResult);
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing data', error: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await AnalysisService.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await AnalysisService.getReportById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error: error.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        await AnalysisService.deleteReport(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error: error.message });
    }
};