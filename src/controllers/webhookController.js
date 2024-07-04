const config = require('../config/config');
const { parse } = require('../utils/objectParser');

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', JSON.stringify(data, null, 2)); 


    res.status(200).json({ message: 'Webhook processed successfully' });
};