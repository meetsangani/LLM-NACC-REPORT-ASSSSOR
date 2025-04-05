const Analysis = require('../models/analysis/Analysis');
const Graph = require('../models/analysis/Graph');
const Report = require('../models/report/Report');

// Function to analyze data - renamed to match controller
const performAnalysis = async (data) => {
    try {
        // Perform analysis logic here
        // Example: Calculate average score, identify trends, etc.
        const analysisResult = await Analysis.create(data);
        return analysisResult;
    } catch (error) {
        console.error("Error analyzing data:", error); // Log the error
        throw new Error('Error analyzing data: ' + error.message);
    }
};

// Function to generate graphs from analysis
const generateGraph = async (analysisId) => {
    try {
        const analysis = await Analysis.findById(analysisId);
        if (!analysis) {
            throw new Error('Analysis not found');
        }

        // Example: Prepare graph data based on analysis
        const graphData = {
            labels: ['Category 1', 'Category 2', 'Category 3'],
            values: [analysis.value1, analysis.value2, analysis.value3], // Example values
            type: 'bar' // Example graph type
        };

        const graph = await Graph.create(graphData);
        return graph;
    } catch (error) {
        console.error("Error generating graph:", error); // Log the error
        throw new Error('Error generating graph: ' + error.message);
    }
};

// Function to create a report (used by generateReport controller)
const createReport = async (reportData) => {
    try {
        const report = new Report(reportData);
        await report.save();
        return report;
    } catch (error) {
        console.error("Error creating report:", error); // Log the error
        throw new Error('Error creating report: ' + error.message);
    }
};

// Added missing method referenced in controller
const getAllReports = async () => {
    try {
        return await Report.find();
    } catch (error) {
        console.error("Error fetching reports:", error); // Log the error
        throw new Error('Error fetching reports: ' + error.message);
    }
};

// Added missing method referenced in controller
const getReportById = async (id) => {
    try {
        return await Report.findById(id);
    } catch (error) {
        console.error("Error fetching report:", error); // Log the error
        throw new Error('Error fetching report: ' + error.message);
    }
};

// Added missing method referenced in controller
const deleteReport = async (id) => {
    try {
        return await Report.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error deleting report:", error); // Log the error
        throw new Error('Error deleting report: ' + error.message);
    }
};

const performLLMAnalysis = async (text) => {
    try {
        // Replace this with actual LLM API call and result processing
        const result = `Analysis result for the provided text: "${text}"`;
        return result;
    } catch (error) {
        console.error("Error performing LLM analysis:", error); // Log the error
        throw new Error('Error performing LLM analysis: ' + error.message);
    }
};

//New Function to get all analysis records
const getAllAnalysis = async () => {
    try {
        return await Analysis.find();
    } catch (error) {
        console.error("Error fetching analysis records:", error); // Log the error
        throw new Error('Error fetching analysis records: ' + error.message);
    }
};

// Exporting the functions
module.exports = {
    performLLMAnalysis,
    performAnalysis,
    generateGraph,
    createReport,
    getAllReports,
    getReportById,
    deleteReport,
    getAllAnalysis // Export the new function
};