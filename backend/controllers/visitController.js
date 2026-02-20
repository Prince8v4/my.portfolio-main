const Visit = require('../models/Visit');
const sendEmail = require('../utils/emailService');

exports.trackVisit = async (req, res) => {
    try {
        const { ipAddress, userAgent, referrer } = req.body;

        const visit = await Visit.create({
            ipAddress,
            userAgent,
            referrer
        });

        // Prepare email content
        const emailContent = `
            <h3>🚀 New Portfolio Visitor</h3>
            <p><strong>Time:</strong> ${visit.visitTime}</p>
            <p><strong>IP Address:</strong> ${visit.ipAddress}</p>
            <p><strong>User Agent:</strong> ${visit.userAgent}</p>
            <p><strong>Referrer:</strong> ${visit.referrer || 'Direct'}</p>
        `;

        // Send email notification asynchronously (don't wait for it to respond to client)
        sendEmail('🚀 New Portfolio Visitor', emailContent);

        res.status(201).json({ success: true, data: visit });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
