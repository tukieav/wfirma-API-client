const config = require('../config/config');
const { parse } = require('../utils/objectParser');
const wfirmaService = require('../services/wfirmaService');

const handleInvoiceAdd = async (invoice) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(invoice.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
    }
};

const handleInvoiceEdit = (invoice) => {
    // Implementacja logiki dla invoice/edit
};

const handleInvoiceDel = (invoice) => {
    // Implementacja logiki dla invoice/del
};

const handleContractorAdd = (contractor) => {
    // Implementacja logiki dla contractors/add
};

const handlePaymentAdd = (payment) => {
    // Implementacja logiki dla payments/add
};

const handleWarehouseGoodChangeState = (warehouseGood) => {
    // Implementacja logiki dla warehouse_good/change_state
};

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', JSON.stringify(data, null, 2));

    const eventType = data.metainfo.webhook_event;

    switch (eventType) {
        case 'invoice/add':
            handleInvoiceAdd(data.invoices[0].invoice);
            break;
        case 'invoice/edit':
            handleInvoiceEdit(data.invoices[0].invoice);
            break;
        case 'invoice/del':
            handleInvoiceDel(data.invoices[0].invoice);
            break;
        case 'contractors/add':
            handleContractorAdd(data.contractors[0].contractor);
            break;
        case 'payments/add':
            handlePaymentAdd(data.payments[0].payment);
            break;
        case 'warehouse_good/change_state':
            handleWarehouseGoodChangeState(data.warehouse_goods[0].warehouse_good);
            break;
        default:
            console.log('Unhandled webhook event:', eventType);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
};