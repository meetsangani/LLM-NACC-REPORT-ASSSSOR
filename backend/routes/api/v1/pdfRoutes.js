const express = require('express');
const router = express.Router();
const pdfController = require('../../../controllers/pdf/pdfController'); // Corrected path

// Define routes for PDF-related operations
router.post('/upload', pdfController.uploadPDF);
router.get('/download/:id', pdfController.downloadPDF);
router.get('/list', pdfController.listPDFs);
router.delete('/delete/:id', pdfController.deletePDF);

module.exports = router;