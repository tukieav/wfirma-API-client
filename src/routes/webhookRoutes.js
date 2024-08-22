const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Trasy do obsługi webhooków
router.post('/', webhookController.handleWebhook);
router.post('/invoice/add', webhookController.manualInvoiceAdd);
router.post('/invoice/edit', webhookController.manualInvoiceEdit);
router.post('/invoice/del', webhookController.manualInvoiceDel);
router.post('/contractor/add', webhookController.manualContractorAdd);
router.post('/payment/add', webhookController.manualPaymentAdd);
router.post('/warehouse_good/change_state', webhookController.manualWarehouseGoodChangeState);

module.exports = router;