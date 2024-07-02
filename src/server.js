const app = require('./app');
const config = require('./config/config');
const wfirmaService = require('./services/wfirmaService');

// Funkcja do sprawdzenia autoryzacji do API wFirma
const checkWfirmaAuth = async () => {
    try {
        console.log('Checking wFirma API authentication...');
        console.log('wFirma API URL:', config.wfirmaApiUrl);
        console.log('wFirma App Key:', config.wfirmaAppKey);
        console.log('wFirma Access Key:', config.wfirmaAccessKey);

        const response = await wfirmaService.fetchData();
        console.log('Successfully authenticated with wFirma API');
    } catch (error) {
        console.error('Error authenticating with wFirma API:', error.message);
    }
};

// Funkcja do uzyskania publicznego IP serwera
const getPublicIp = async () => {
    try {
        const { publicIpv4 } = await import('public-ip');
        const ip = await publicIpv4();
        console.log(`Server public IP: ${ip}`);
        return ip;
    } catch (error) {
        console.error('Error fetching public IP:', error.message);
    }
};

// Funkcja do zarządzania webhookami
const manageWebhooks = async (publicIp) => {
    try {
        const webhooks = await wfirmaService.getWebhooks();
        console.log('Fetched webhooks:', webhooks);
        if (!Array.isArray(webhooks)) {
            throw new Error('Invalid response format for webhooks');
        }
        const existingWebhook = webhooks.find(wh => wh.url === `http://${publicIp}:3000/webhook`);

        if (existingWebhook) {
            console.log('Webhook already exists:', existingWebhook);
        } else {
            const newWebhook = await wfirmaService.createWebhook(`http://${publicIp}:3000/webhook`);
            console.log('Created new webhook:', newWebhook);
        }
    } catch (error) {
        console.error('Error managing webhooks:', error.message);
    }
};

const startServer = async () => {
    await checkWfirmaAuth();
    const publicIp = await getPublicIp();
    await manageWebhooks(publicIp);

    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();