const express = require('express');
const router = express.Router();
const reportController = require('../../../controllers/report/reportController');

// Define routes for report-related operations
router.post('/', reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;