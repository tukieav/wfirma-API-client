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

// Trasy GET do sprawdzania endpointów
router.get('/invoice/add', webhookController.getInvoiceAdd);
router.get('/invoice/edit', webhookController.getInvoiceEdit);
router.get('/invoice/del', webhookController.getInvoiceDel);
router.get('/contractor/add', webhookController.getContractorAdd);
router.get('/payment/add', webhookController.getPaymentAdd);
router.get('/warehouse_good/change_state', webhookController.getWarehouseGoodChangeState);

module.exports = router;