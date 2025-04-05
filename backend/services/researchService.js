const Research = require('../models/research/Research');

const createResearch = async (data) => {
    const research = new Research(data);
    return await research.save();
};

const getResearchById = async (id) => {
    return await Research.findById(id);
};

const getAllResearch = async () => {
    return await Research.find();
};

const updateResearch = async (id, data) => {
    return await Research.findByIdAndUpdate(id, data, { new: true });
};

const deleteResearch = async (id) => {
    return await Research.findByIdAndDelete(id);
};

module.exports = {
    createResearch,
    getResearchById,
    getAllResearch,
    updateResearch,
    deleteResearch,
};