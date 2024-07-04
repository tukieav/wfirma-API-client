const axios = require('axios');
const config = require('../config/config');

const createAuthHeaders = () => {
    return {
        'appKey': config.wfirmaAppKey,
        'accessKey': config.wfirmaAccessKey,
        'secretKey': config.wfirmaSecretKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};

exports.findCompanies = async () => {
    const url = `${config.wfirmaApiUrl}/companies/find?inputFormat=json&outputFormat=json`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

exports.getInvoiceById = async (invoiceId) => {
    const url = `${config.wfirmaApiUrl}/invoices/get/${invoiceId}?outputFormat=json&inputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};