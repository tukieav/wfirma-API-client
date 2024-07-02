const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/config');
const xml2js = require('xml2js');

// Funkcja do generowania podpisu
const generateSignature = (method, url, timestamp) => {
    const stringToSign = `${method}\n${url}\n${timestamp}`;
    console.log('String to sign:', stringToSign); // Dodaj logowanie stringa do podpisania
    const signature = crypto.createHmac('sha1', config.wfirmaSecretKey).update(stringToSign).digest('base64');
    console.log('Generated signature:', signature); // Dodaj logowanie wygenerowanego podpisu
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

// Funkcja do parsowania odpowiedzi XML na JSON
const parseXmlToJson = async (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.fetchData = async () => {
    const url = `${config.wfirmaApiUrl}/resources/find?inputFormat=json&outputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders('GET', url);

    console.log('Headers:', headers); // Dodaj logowanie nagłówków

    const response = await axios.get(url, { headers });
    const jsonResponse = await parseXmlToJson(response.data);
    return jsonResponse;
};

exports.getWebhooks = async () => {
    const url = `${config.wfirmaApiUrl}/webhooks/find?inputFormat=json&outputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders('GET', url);

    console.log('Headers:', headers); // Dodaj logowanie nagłówków

    const response = await axios.get(url, { headers });
    console.log('Webhooks response:', response.data);

    // Parsowanie odpowiedzi XML na JSON
    const jsonResponse = await parseXmlToJson(response.data);
    return jsonResponse.api.webhooks.webhook;
};

exports.createWebhook = async (webhookUrl) => {
    const url = `${config.wfirmaApiUrl}/webhooks/add?inputFormat=json&outputFormat=json&company_id=${config.companyId}`;
    const headers = createAuthHeaders('POST', url);

    console.log('Headers:', headers); // Dodaj logowanie nagłówków

    const response = await axios.post(url, {
        webhook: {
            url: webhookUrl,
            events: ["invoice/add"], // Zmień na odpowiednie zdarzenia
            data_type: "json"
        }
    }, { headers });

    // Parsowanie odpowiedzi XML na JSON
    const jsonResponse = await parseXmlToJson(response.data);
    return jsonResponse.api.webhook;
};