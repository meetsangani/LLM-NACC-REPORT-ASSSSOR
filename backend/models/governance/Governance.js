const mongoose = require('mongoose');

const governanceSchema = new mongoose.Schema({
    policyName: {
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

governanceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Governance = mongoose.model('Governance', governanceSchema);

module.exports = Governance;