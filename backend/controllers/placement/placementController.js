const Placement = require('../../models/placement/Placement');
const placementService = require('../../services/placementService');

// Create a new placement record
exports.createPlacement = async (req, res) => {
    try {
        const placementData = req.body;
        const newPlacement = await placementService.createPlacement(placementData);
        res.status(201).json(newPlacement);
    } catch (error) {
        res.status(500).json({ message: 'Error creating placement', error });
    }
};

// Get all placements
exports.getAllPlacements = async (req, res) => {
    try {
        const placements = await placementService.getAllPlacements();
        res.status(200).json(placements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching placements', error });
    }
};

// Get a placement by ID
exports.getPlacementById = async (req, res) => {
    try {
        const placementId = req.params.id;
        const placement = await placementService.getPlacementById(placementId);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.status(200).json(placement);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching placement', error });
    }
};

// Update a placement record
exports.updatePlacement = async (req, res) => {
    try {
        const placementId = req.params.id;
        const updatedData = req.body;
        const updatedPlacement = await placementService.updatePlacement(placementId, updatedData);
        if (!updatedPlacement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.status(200).json(updatedPlacement);
    } catch (error) {
        res.status(500).json({ message: 'Error updating placement', error });
    }
};

// Delete a placement record
exports.deletePlacement = async (req, res) => {
    try {
        const placementId = req.params.id;
        const deletedPlacement = await placementService.deletePlacement(placementId);
        if (!deletedPlacement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting placement', error });
    }
};