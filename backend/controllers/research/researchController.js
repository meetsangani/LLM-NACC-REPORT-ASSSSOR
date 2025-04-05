const Research = require('../../models/research/Research');
const researchService = require('../../services/researchService');

// Create a new research entry
exports.createResearch = async (req, res) => {
    try {
        const researchData = req.body;
        const newResearch = await researchService.createResearch(researchData);
        res.status(201).json(newResearch);
    } catch (error) {
        res.status(500).json({ message: 'Error creating research entry', error });
    }
};

// Get all research entries
exports.getAllResearch = async (req, res) => {
    try {
        const researchEntries = await researchService.getAllResearch();
        res.status(200).json(researchEntries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching research entries', error });
    }
};

// Get a specific research entry by ID
exports.getResearchById = async (req, res) => {
    try {
        const researchId = req.params.id;
        const researchEntry = await researchService.getResearchById(researchId);
        if (!researchEntry) {
            return res.status(404).json({ message: 'Research entry not found' });
        }
        res.status(200).json(researchEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching research entry', error });
    }
};

// Update a research entry
exports.updateResearch = async (req, res) => {
    try {
        const researchId = req.params.id;
        const updatedData = req.body;
        const updatedResearch = await researchService.updateResearch(researchId, updatedData);
        if (!updatedResearch) {
            return res.status(404).json({ message: 'Research entry not found' });
        }
        res.status(200).json(updatedResearch);
    } catch (error) {
        res.status(500).json({ message: 'Error updating research entry', error });
    }
};

// Delete a research entry
exports.deleteResearch = async (req, res) => {
    try {
        const researchId = req.params.id;
        const deletedResearch = await researchService.deleteResearch(researchId);
        if (!deletedResearch) {
            return res.status(404).json({ message: 'Research entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting research entry', error });
    }
};