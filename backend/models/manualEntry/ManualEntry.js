const mongoose = require('mongoose');

const ManualEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ManualEntrySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ManualEntry = mongoose.model('ManualEntry', ManualEntrySchema);

module.exports = ManualEntry;