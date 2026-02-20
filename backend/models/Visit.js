const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    referrer: { type: String },
    visitTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visit', visitSchema);
