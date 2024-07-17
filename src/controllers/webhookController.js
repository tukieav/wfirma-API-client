const wfirmaService = require('../services/wfirmaService');
const { saveInvoiceData } = require('./invoiceController');

const handleInvoiceAdd = async (invoice) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(invoice.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
        await saveInvoiceData(invoiceData.invoices[0].invoice);
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
    }
};

const handleInvoiceEdit = async (invoice) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(invoice.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
    }
};

const handleInvoiceDel = async (invoice) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(invoice.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
    }
};

const handleContractorAdd = async (contractor) => {
    try {
        const contractorData = await wfirmaService.getContractorById(contractor.id);
        console.log('Contractor data from API:', JSON.stringify(contractorData, null, 2));
    } catch (error) {
        console.error('Error fetching contractor data:', error.message);
    }
};

const handlePaymentAdd = async (payment) => {
    try {
        const paymentData = await wfirmaService.getPaymentById(payment.id);
        console.log('Payment data from API:', JSON.stringify(paymentData, null, 2));
    } catch (error) {
        console.error('Error fetching payment data:', error.message);
    }
};

const handleWarehouseGoodChangeState = async (warehouseGood) => {
    try {
        const warehouseGoodData = await wfirmaService.getWarehouseGoodById(warehouseGood.good.id);
        console.log('Warehouse Good data from API:', JSON.stringify(warehouseGoodData, null, 2));
    } catch (error) {
        console.error('Error fetching warehouse good data:', error.message);
    }
};

exports.handleWebhook = async (req, res) => {
    const data = req.body;
    console.log('Webhook received:', JSON.stringify(data, null, 2));

    const eventType = data.metainfo.webhook_event;

    switch (eventType) {
        case 'invoice/add':
            await handleInvoiceAdd(data.invoices[0].invoice);
            break;
        case 'invoice/edit':
            await handleInvoiceEdit(data.invoices[0].invoice);
            break;
        case 'invoice/del':
            await handleInvoiceDel(data.invoices[0].invoice);
            break;
        case 'contractors/add':
            await handleContractorAdd(data.contractors[0].contractor);
            break;
        case 'payments/add':
            await handlePaymentAdd(data.payments[0].payment);
            break;
        case 'warehouse_good/change_state':
            await handleWarehouseGoodChangeState(data.warehouse_goods[0].warehouse_good);
            break;
        default:
            console.log('Unhandled webhook event:', eventType);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
};