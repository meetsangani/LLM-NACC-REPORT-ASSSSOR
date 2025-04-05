const Infrastructure = require('../../models/infrastructure/Infrastructure');
const infrastructureService = require('../../services/infrastructureService');

exports.createInfrastructure = async (req, res) => {
    try {
        const infrastructureData = req.body;
        const newInfrastructure = await infrastructureService.createInfrastructure(infrastructureData);
        res.status(201).json(newInfrastructure);
    } catch (error) {
        res.status(500).json({ message: 'Error creating infrastructure', error: error.message });
    }
};

exports.getAllInfrastructures = async (req, res) => {
    try {
        const infrastructures = await infrastructureService.getAllInfrastructures();
        res.status(200).json(infrastructures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching infrastructures', error: error.message });
    }
};

exports.getInfrastructureById = async (req, res) => {
    try {
        const { id } = req.params;
        const infrastructure = await infrastructureService.getInfrastructure(id);
        if (!infrastructure) {
            return res.status(404).json({ message: 'Infrastructure not found' });
        }
        res.status(200).json(infrastructure);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching infrastructure', error: error.message });
    }
};

exports.updateInfrastructure = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInfrastructure = await infrastructureService.updateInfrastructure(id, req.body);
        if (!updatedInfrastructure) {
            return res.status(404).json({ message: 'Infrastructure not found' });
        }
        res.status(200).json(updatedInfrastructure);
    } catch (error) {
        res.status(500).json({ message: 'Error updating infrastructure', error: error.message });
    }
};

exports.deleteInfrastructure = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInfrastructure = await infrastructureService.deleteInfrastructure(id);
        if (!deletedInfrastructure) {
            return res.status(404).json({ message: 'Infrastructure not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting infrastructure', error: error.message });
    }
};