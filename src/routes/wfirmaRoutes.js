const express = require('express');
const router = express.Router();
const wfirmaController = require('../controllers/wfirmaController');

router.get('/', wfirmaController.getWfirmaData);

module.exports = router;