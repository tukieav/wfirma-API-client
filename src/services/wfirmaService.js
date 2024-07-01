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