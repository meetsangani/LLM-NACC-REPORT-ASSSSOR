const Placement = require('../models/placement/Placement');

const createPlacement = async (placementData) => {
    const placement = new Placement(placementData);
    return await placement.save();
};

const getAllPlacements = async () => {
    return await Placement.find();
};

const getPlacementById = async (id) => {
    return await Placement.findById(id);
};

const updatePlacement = async (id, placementData) => {
    return await Placement.findByIdAndUpdate(id, placementData, { new: true });
};

const deletePlacement = async (id) => {
    return await Placement.findByIdAndDelete(id);
};

module.exports = {
    createPlacement,
    getAllPlacements,
    getPlacementById,
    updatePlacement,
    deletePlacement,
};