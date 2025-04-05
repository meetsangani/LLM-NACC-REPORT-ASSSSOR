const pdfParser = require('pdf-parse');
const fs = require('fs');

/**
 * Parses a PDF file and extracts text content.
 * @param {string} filePath - The path to the PDF file.
 * @returns {Promise<string>} - A promise that resolves to the extracted text.
 */
const parsePDF = (filePath) => {
    return new Promise((resolve, reject) => {
        let dataBuffer = fs.readFileSync(filePath);
        pdfParser(dataBuffer).then(function(data) {
            resolve(data.text);
        }).catch(function(error) {
            reject(error);
        });
    });
};

/**
 * Parses multiple PDF files and extracts text content.
 * @param {Array<string>} filePaths - An array of paths to the PDF files.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of extracted texts.
 */
const parseMultiplePDFs = async (filePaths) => {
    const results = [];
    for (const filePath of filePaths) {
        try {
            const text = await parsePDF(filePath);
            results.push(text);
        } catch (error) {
            results.push(`Error parsing ${filePath}: ${error.message}`);
        }
    }
    return results;
};

module.exports = {
    parsePDF,
    parseMultiplePDFs
};