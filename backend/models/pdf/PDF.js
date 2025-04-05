const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: Buffer,
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

pdfSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;