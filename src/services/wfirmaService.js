const axios = require('axios');
const config = require('../config/config');

exports.fetchData = async () => {
    const response = await axios.get(`${config.wfirmaApiUrl}/resource`, {
        headers: {
            'Authorization': `Bearer ${config.wfirmaApiKey}`
        }
    });
    return response.data;
};

exports.getWebhooks = async () => {
    const response = await axios.get(`${config.wfirmaApiUrl}/webhooks`, {
        headers: {
            'Authorization': `Bearer ${config.wfirmaApiKey}`
        }
    });
    return response.data;
};

exports.createWebhook = async (url) => {
    const response = await axios.post(`${config.wfirmaApiUrl}/webhooks`, {
        webhook: {
            url: url,
            events: ["example_event"] // Zmień na odpowiednie zdarzenia
        }
    }, {
        headers: {
            'Authorization': `Bearer ${config.wfirmaApiKey}`
        }
    });
    return response.data;
};