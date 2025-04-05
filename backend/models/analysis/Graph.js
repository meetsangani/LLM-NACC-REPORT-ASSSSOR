const mongoose = require('mongoose');

const GraphSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    data: {
        type: [Number],
        required: true
    },
    labels: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Graph', GraphSchema);