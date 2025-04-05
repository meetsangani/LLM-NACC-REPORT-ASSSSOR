const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

reportSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;