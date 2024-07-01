const wfirmaService = require('../services/wfirmaService');

exports.getWfirmaData = async (req, res) => {
    try {
        const data = await wfirmaService.fetchData();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from wFirma API');
    }
};