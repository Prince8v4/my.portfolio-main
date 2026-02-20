const Enquiry = require('../models/Enquiry');
const sendEmail = require('../utils/emailService');

exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, projectType, budget, projectDetails } = req.body;

        if (!name || !email || !projectType || !projectDetails) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        const enquiry = await Enquiry.create({
            name,
            email,
            projectType,
            budget,
            projectDetails
        });

        const emailContent = `
            <h3>💼 New Project Enquiry</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Details:</strong></p>
            <p>${projectDetails}</p>
        `;

        sendEmail('💼 New Project Enquiry', emailContent);

        res.status(201).json({ success: true, data: enquiry });
    } catch (error) {
        console.error('Error submitting enquiry:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
