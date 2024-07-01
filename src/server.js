const app = require('./app');
const config = require('./config/config');
const axios = require('axios');

// Funkcja do sprawdzenia autoryzacji do API wFirma
const checkWfirmaAuth = async () => {
    try {
        const response = await axios.get(`${config.wfirmaApiUrl}/resource`, {
            headers: {
                'Authorization': `Bearer ${config.wfirmaApiKey}`
            }
        });
        if (response.status === 200) {
            console.log('Successfully authenticated with wFirma API');
        } else {
            console.error('Failed to authenticate with wFirma API');
        }
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
    } catch (error) {
        console.error('Error fetching public IP:', error.message);
    }
};

const startServer = async () => {
    await checkWfirmaAuth();
    await getPublicIp();

    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();