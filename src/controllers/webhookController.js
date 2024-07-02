const config = require('../config/config')
const pool = require('../db');

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    const webhookKey = config.webhook_key;

    res.status(200).json({ webhook_key: webhookKey });
};