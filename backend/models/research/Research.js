const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    keywords: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

researchSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Research = mongoose.model('Research', researchSchema);

module.exports = Research;