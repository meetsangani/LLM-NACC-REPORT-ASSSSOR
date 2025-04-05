const ManualEntry = require('../../models/manualEntry/ManualEntry');

// Create a new manual entry
exports.createManualEntry = async (req, res) => {
    try {
        const manualEntryData = req.body;
        const newManualEntry = new ManualEntry(manualEntryData);
        await newManualEntry.save();
        res.status(201).json({ message: 'Manual entry created successfully', data: newManualEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error creating manual entry', error: error.message });
    }
};

// Get all manual entries
exports.getAllManualEntries = async (req, res) => {
    try {
        const manualEntries = await ManualEntry.find();
        res.status(200).json({ message: 'Manual entries retrieved successfully', data: manualEntries });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving manual entries', error: error.message });
    }
};

// Get a manual entry by ID
exports.getManualEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const manualEntry = await ManualEntry.findById(id);
        if (!manualEntry) {
            return res.status(404).json({ message: 'Manual entry not found' });
        }
        res.status(200).json({ message: 'Manual entry retrieved successfully', data: manualEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving manual entry', error: error.message });
    }
};

// Update a manual entry by ID
exports.updateManualEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedManualEntry = await ManualEntry.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedManualEntry) {
            return res.status(404).json({ message: 'Manual entry not found' });
        }
        res.status(200).json({ message: 'Manual entry updated successfully', data: updatedManualEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error updating manual entry', error: error.message });
    }
};

// Delete a manual entry by ID
exports.deleteManualEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedManualEntry = await ManualEntry.findByIdAndDelete(id);
        if (!deletedManualEntry) {
            return res.status(404).json({ message: 'Manual entry not found' });
        }
        res.status(200).json({ message: 'Manual entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting manual entry', error: error.message });
    }
};