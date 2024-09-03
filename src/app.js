const express = require('express');
const app = express();
const router = express.Router();
const webhookController = require('./controllers/webhookController');

// Middleware do parsowania JSON
app.use(express.json());

// Definicje tras dla webhooków
router.post('/webhook/invoice/add', webhookController.handleInvoiceAdd);
router.post('/webhook/invoice/edit', webhookController.handleInvoiceEdit);
router.post('/webhook/invoice/del', webhookController.handleInvoiceDel);
router.post('/webhook/contractor/add', webhookController.handleContractorAdd);
router.post('/webhook/payment/add', webhookController.handlePaymentAdd);
router.post('/webhook/warehouse_good/change_state', webhookController.handleWarehouseGoodChangeState);

// Trasy GET do sprawdzania endpointów
router.get('/webhook/invoice/add', webhookController.getInvoiceAdd);
router.get('/webhook/invoice/edit', webhookController.getInvoiceEdit);
router.get('/webhook/invoice/del', webhookController.getInvoiceDel);
router.get('/webhook/contractor/add', webhookController.getContractorAdd);
router.get('/webhook/payment/add', webhookController.getPaymentAdd);
router.get('/webhook/warehouse_good/change_state', webhookController.getWarehouseGoodChangeState);

// Użycie routera
app.use(router);

module.exports = app;