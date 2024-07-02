const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/config');
// Funkcja do generowania podpisu
const generateSignature = (method, url, timestamp) => {
    const stringToSign = `${method}\n${url}\n${timestamp}`;
    //console.log('String to sign:', stringToSign); // Dodaj logowanie stringa do podpisania
    const signature = crypto.createHmac('sha1', config.wfirmaSecretKey).update(stringToSign).digest('base64');
    //console.log('Generated signature:', signature); // Dodaj logowanie wygenerowanego podpisu
    return signature;
};

// Funkcja do tworzenia nagłówków autoryzacyjnych
const createAuthHeaders = (method, url) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(method, url, timestamp);

    return {
        'appKey': config.wfirmaAppKey,
        'accessKey': config.wfirmaAccessKey,
        'secretKey': config.wfirmaSecretKey,
        'Timestamp': timestamp,
        'Signature': signature,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};

exports.findCompanies = async () => {
    const url = `${config.wfirmaApiUrl}/companies/find?inputFormat=json&outputFormat=json`;
    const headers = createAuthHeaders('GET', url);
    // console.log('Headers:', headers); // Dodaj logowanie nagłówków
    const response = await axios.get(url, { headers });
    return response.data;
};