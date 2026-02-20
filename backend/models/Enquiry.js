const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    budget: {
        type: String
    },
    projectDetails: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
