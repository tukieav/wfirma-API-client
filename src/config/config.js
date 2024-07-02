require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    wfirmaAppKey: process.env.WFIRMA_APP_KEY,
    wfirmaAccessKey: process.env.WFIRMA_ACCESS_KEY,
    wfirmaSecretKey: process.env.WFIRMA_SECRET_KEY,
    wfirmaApiUrl: process.env.WFIRMA_API_URL,
    companyId: process.env.COMPANY_ID,
    webhook_key: process.env.WEBHOOK_KEY,
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    }
};