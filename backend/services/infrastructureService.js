const Infrastructure = require('../models/infrastructure/Infrastructure');

const createInfrastructure = async (data) => {
    try {
        const infrastructure = new Infrastructure(data);
        await infrastructure.save();
        return infrastructure;
    } catch (error) {
        throw new Error('Error creating infrastructure: ' + error.message);
    }
};

const getInfrastructure = async (id) => {
    try {
        const infrastructure = await Infrastructure.findById(id);
        if (!infrastructure) {
            throw new Error('Infrastructure not found');
        }
        return infrastructure;
    } catch (error) {
        throw new Error('Error fetching infrastructure: ' + error.message);
    }
};

const updateInfrastructure = async (id, data) => {
    try {
        const infrastructure = await Infrastructure.findByIdAndUpdate(id, data, { new: true });
        if (!infrastructure) {
            throw new Error('Infrastructure not found');
        }
        return infrastructure;
    } catch (error) {
        throw new Error('Error updating infrastructure: ' + error.message);
    }
};

const deleteInfrastructure = async (id) => {
    try {
        const infrastructure = await Infrastructure.findByIdAndDelete(id);
        if (!infrastructure) {
            throw new Error('Infrastructure not found');
        }
        return infrastructure;
    } catch (error) {
        throw new Error('Error deleting infrastructure: ' + error.message);
    }
};

const getAllInfrastructures = async () => {
    try {
        return await Infrastructure.find();
    } catch (error) {
        throw new Error('Error fetching infrastructures: ' + error.message);
    }
};

module.exports = {
    createInfrastructure,
    getInfrastructure,
    updateInfrastructure,
    deleteInfrastructure,
    getAllInfrastructures
};