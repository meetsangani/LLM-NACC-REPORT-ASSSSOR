const Governance = require('../models/governance/Governance');

const createGovernanceEntry = async (data) => {
    try {
        const governanceEntry = new Governance(data);
        await governanceEntry.save();
        return governanceEntry;
    } catch (error) {
        throw new Error('Error creating governance entry: ' + error.message);
    }
};

const getGovernanceEntries = async () => {
    try {
        return await Governance.find();
    } catch (error) {
        throw new Error('Error fetching governance entries: ' + error.message);
    }
};

const updateGovernanceEntry = async (id, data) => {
    try {
        return await Governance.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error('Error updating governance entry: ' + error.message);
    }
};

const deleteGovernanceEntry = async (id) => {
    try {
        return await Governance.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting governance entry: ' + error.message);
    }
};

module.exports = {
    createGovernanceEntry,
    getGovernanceEntries,
    updateGovernanceEntry,
    deleteGovernanceEntry,
};