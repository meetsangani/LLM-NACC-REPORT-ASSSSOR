const express = require('express');
const router = express.Router();
const analysisController = require('../../../controllers/analysis/analysisController');

// Define routes for analysis-related operations
router.post('/analyze', analysisController.performAnalysis);
router.get('/reports', analysisController.getReports);
router.get('/report/:id', analysisController.getReportById);
router.delete('/report/:id', analysisController.deleteReport);
router.post('/llm', analysisController.performLLMAnalysis); 

module.exports = router;