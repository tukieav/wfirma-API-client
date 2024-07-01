require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    wfirmaApiKey: process.env.WFIRMA_API_KEY,
    wfirmaApiUrl: process.env.WFIRMA_API_URL
};