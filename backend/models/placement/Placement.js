const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    placementDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Placed', 'Not Placed'],
        default: 'Not Placed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);