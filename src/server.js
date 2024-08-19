const app = require('./app');
const config = require('./config/config');
const wfirmaService = require('./services/wfirmaService');
const mongoose = require('mongoose');

const checkWfirmaAuth = async () => {
    try {
        await wfirmaService.findCompanies();
        console.log('Successfully authenticated with wFirma API');
    } catch (error) {
        console.error('Error authenticating with wFirma API:', error.message);
    }
};

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

    try {
        await mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }

    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();