const Feedback = require('../models/Feedback');
const sendEmail = require('../utils/emailService');

exports.submitFeedback = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please provide all fields' });
        }

        const feedback = await Feedback.create({
            name,
            email,
            message
        });

        const emailContent = `
            <h3>📩 New Feedback Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        sendEmail('📩 New Feedback Received', emailContent);

        res.status(201).json({ success: true, data: feedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
