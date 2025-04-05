const DeveloperAdmin = require('../../models/developerAdmin/DeveloperAdmin'); // Import the DeveloperAdmin model

// Function to create a new developer admin
exports.createDeveloperAdmin = async (req, res) => {
    try {
        const developerAdmin = new DeveloperAdmin(req.body);
        await developerAdmin.save();
        res.status(201).json(developerAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get all developer admins
exports.getDeveloperAdmins = async (req, res) => {
    try {
        const developerAdmins = await DeveloperAdmin.find();
        res.status(200).json(developerAdmins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a developer admin by ID
exports.getDeveloperAdminById = async (req, res) => {
    try {
        const developerAdmin = await DeveloperAdmin.findById(req.params.id);
        if (!developerAdmin) {
            return res.status(404).json({ message: 'Developer Admin not found' });
        }
        res.status(200).json(developerAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a developer admin
exports.updateDeveloperAdmin = async (req, res) => {
    try {
        const developerAdmin = await DeveloperAdmin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!developerAdmin) {
            return res.status(404).json({ message: 'Developer Admin not found' });
        }
        res.status(200).json(developerAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a developer admin
exports.deleteDeveloperAdmin = async (req, res) => {
    try {
        const developerAdmin = await DeveloperAdmin.findByIdAndDelete(req.params.id);
        if (!developerAdmin) {
            return res.status(404).json({ message: 'Developer Admin not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};