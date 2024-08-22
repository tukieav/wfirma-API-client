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

// Użycie routera
app.use(router);

module.exports = app;