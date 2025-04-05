const Governance = require('../../models/governance/Governance');

// Function to create a new governance record
exports.createGovernance = async (req, res) => {
    try {
        const governanceData = new Governance(req.body);
        const savedGovernance = await governanceData.save();
        res.status(201).json(savedGovernance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get all governance records
exports.getAllGovernance = async (req, res) => {
    try {
        const governanceRecords = await Governance.find();
        res.status(200).json(governanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a governance record by ID
exports.getGovernanceById = async (req, res) => {
    try {
        const governanceRecord = await Governance.findById(req.params.id);
        if (!governanceRecord) {
            return res.status(404).json({ message: 'Governance record not found' });
        }
        res.status(200).json(governanceRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a governance record by ID
exports.updateGovernance = async (req, res) => {
    try {
        const updatedGovernance = await Governance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGovernance) {
            return res.status(404).json({ message: 'Governance record not found' });
        }
        res.status(200).json(updatedGovernance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a governance record by ID
exports.deleteGovernance = async (req, res) => {
    try {
        const deletedGovernance = await Governance.findByIdAndDelete(req.params.id);
        if (!deletedGovernance) {
            return res.status(404).json({ message: 'Governance record not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};