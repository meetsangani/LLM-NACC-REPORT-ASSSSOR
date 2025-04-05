const PDFService = require('../../services/pdfService');

exports.uploadPDF = async (req, res) => {
    try {
        const pdfData = req.body;
        const result = await PDFService.savePDF(pdfData);
        res.status(201).json({ message: 'PDF uploaded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading PDF', error: error.message });
    }
};

exports.getPDF = async (req, res) => {
    try {
        const pdfId = req.params.id;
        const pdf = await PDFService.getPDFById(pdfId);
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }
        res.status(200).json(pdf);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving PDF', error: error.message });
    }
};

exports.deletePDF = async (req, res) => {
    try {
        const pdfId = req.params.id;
        const result = await PDFService.deletePDF(pdfId);
        if (!result) {
            return res.status(404).json({ message: 'PDF not found' });
        }
        res.status(200).json({ message: 'PDF deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting PDF', error: error.message });
    }
};

exports.downloadPDF = async (req, res) => {
    try {
        const pdfId = req.params.id;
        const pdf = await PDFService.getPDFById(pdfId);
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf.content);
    } catch (error) {
        res.status(500).json({ message: 'Error downloading PDF', error: error.message });
    }
};

exports.listPDFs = async (req, res) => {
    try {
        const pdfs = await PDFService.getAllPDFs();
        res.status(200).json(pdfs);
    } catch (error) {
        res.status(500).json({ message: 'Error listing PDFs', error: error.message });
    }
};