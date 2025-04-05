const PDF = require('../models/pdf/PDF');
const PDFResult = require('../models/pdf/PDFResult');
const pdfParser = require('../utils/common/pdfParser');

// Function to create a new PDF entry (renamed from createPDF to match controller)
const savePDF = async (pdfData) => {
    const pdf = new PDF(pdfData);
    return await pdf.save();
};

// Function to get a PDF by ID
const getPDFById = async (id) => {
    return await PDF.findById(id);
};

// Function to update a PDF entry
const updatePDF = async (id, pdfData) => {
    return await PDF.findByIdAndUpdate(id, pdfData, { new: true });
};

// Function to delete a PDF entry
const deletePDF = async (id) => {
    return await PDF.findByIdAndDelete(id);
};

// Function to parse a PDF file - fixed to use correct method name
const parsePDF = async (filePath) => {
    return await pdfParser.parsePDF(filePath);
};

// Function to get all PDF results
const getAllPDFResults = async () => {
    return await PDFResult.find();
};

// Added missing method referenced in controller
const getAllPDFs = async () => {
    return await PDF.find();
};

// Function to create a new PDF result
const createPDFResult = async (resultData) => {
    const result = new PDFResult(resultData);
    return await result.save();
};

module.exports = {
    savePDF,
    getPDFById,
    updatePDF,
    deletePDF,
    parsePDF,
    getAllPDFResults,
    createPDFResult,
    getAllPDFs
};