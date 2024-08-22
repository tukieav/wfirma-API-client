const axios = require('axios');
const config = require('../config/config');

// Tworzenie nagłówków autoryzacyjnych
const createAuthHeaders = () => {
    return {
        'appKey': config.wfirmaAppKey,
        'accessKey': config.wfirmaAccessKey,
        'secretKey': config.wfirmaSecretKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};

// Znalezienie firm w API wFirma
exports.findCompanies = async () => {
    const url = `${config.wfirmaApiUrl}/companies/find?inputFormat=json&outputFormat=json`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

// Pobranie faktury po ID
exports.getInvoiceById = async (invoiceId) => {
    const url = `${config.wfirmaApiUrl}/invoices/get/${invoiceId}?outputFormat=json&inputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

// Pobranie kontrahenta po ID
exports.getContractorById = async (contractorId) => {
    const url = `${config.wfirmaApiUrl}/contractors/get/${contractorId}?outputFormat=json&inputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

// Pobranie płatności po ID
exports.getPaymentById = async (paymentId) => {
    const url = `${config.wfirmaApiUrl}/payments/get/${paymentId}?outputFormat=json&inputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

// Pobranie towaru z magazynu po ID
exports.getWarehouseGoodById = async (warehouseGoodId) => {
    const url = `${config.wfirmaApiUrl}/goods/get/${warehouseGoodId}?outputFormat=json&inputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};