const express = require('express');
const router = express.Router();
const wfirmaController = require('../controllers/wfirmaController');

// Trasa do pobierania danych z API wFirma
router.get('/', wfirmaController.getWfirmaData);

module.exports = router;