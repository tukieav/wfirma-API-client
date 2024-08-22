const wfirmaService = require('../services/wfirmaService');
const parseObject = require('../utils/objectParser');

// Pobranie danych z API wFirma
exports.getWfirmaData = async (req, res) => {
    try {
        const data = await wfirmaService.findCompanies();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from wFirma API');
    }
};