const app = require('./app');
const config = require('./config/config');
const wfirmaService = require('./services/wfirmaService');

// Funkcja do sprawdzenia autoryzacji do API wFirma
const checkWfirmaAuth = async () => {
    try {
       // console.log('Checking wFirma API authentication...');
        //console.log('wFirma API URL:', config.wfirmaApiUrl);
        //console.log('wFirma App Key:', config.wfirmaAppKey);
        //console.log('wFirma Access Key:', config.wfirmaAccessKey);

        console.log('Successfully authenticated with wFirma API');
        const response = await wfirmaService.findCompanies();
        console.log('Companies', response)
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

const startServer = async () => {
    await checkWfirmaAuth();
    const publicIp = await getPublicIp();

    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();