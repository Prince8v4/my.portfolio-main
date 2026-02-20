const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    referrer: {
        type: String
    },
    visitTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);
