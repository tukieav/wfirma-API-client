const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Trasy do obsługi webhooków
router.post('/invoice/add', webhookController.handleInvoiceAdd);
router.post('/invoice/edit', webhookController.handleInvoiceEdit);
router.post('/invoice/del', webhookController.handleInvoiceDel);
router.post('/contractor/add', webhookController.handleContractorAdd);
router.post('/payment/add', webhookController.handlePaymentAdd);
router.post('/warehouse_good/change_state', webhookController.handleWarehouseGoodChangeState);

module.exports = router;