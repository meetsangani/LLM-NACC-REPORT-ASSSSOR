const ManualEntry = require('../models/manualEntry/ManualEntry');

// Create a new manual entry
exports.createManualEntry = async (manualEntryData) => {
    try {
        const newManualEntry = new ManualEntry(manualEntryData);
        return await newManualEntry.save();
    } catch (error) {
        throw new Error('Error creating manual entry: ' + error.message);
    }
};

// Get all manual entries
exports.getAllManualEntries = async () => {
    try {
        return await ManualEntry.find();
    } catch (error) {
        throw new Error('Error retrieving manual entries: ' + error.message);
    }
};

// Get a manual entry by ID
exports.getManualEntryById = async (id) => {
    try {
        const manualEntry = await ManualEntry.findById(id);
        if (!manualEntry) {
            throw new Error('Manual entry not found');
        }
        return manualEntry;
    } catch (error) {
        throw new Error('Error retrieving manual entry: ' + error.message);
    }
};

// Update a manual entry by ID
exports.updateManualEntry = async (id, updateData) => {
    try {
        const updatedManualEntry = await ManualEntry.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedManualEntry) {
            throw new Error('Manual entry not found');
        }
        return updatedManualEntry;
    } catch (error) {
        throw new Error('Error updating manual entry: ' + error.message);
    }
};

// Delete a manual entry by ID
exports.deleteManualEntry = async (id) => {
    try {
        const deletedManualEntry = await ManualEntry.findByIdAndDelete(id);
        if (!deletedManualEntry) {
            throw new Error('Manual entry not found');
        }
        return; // No data is returned on successful deletion
    } catch (error) {
        throw new Error('Error deleting manual entry: ' + error.message);
    }
};
