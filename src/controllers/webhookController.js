const wfirmaService = require('../services/wfirmaService');
const { saveInvoiceData } = require('./invoiceController');

const handleInvoiceAdd = async (invoice) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(invoice.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
        
        if (!invoiceData || !invoiceData.invoices || !invoiceData.invoices[0] || !invoiceData.invoices[0].invoice) {
            throw new Error('Invoice data is missing');
        }

        const invoiceToSave = invoiceData.invoices[0].invoice;
        console.log('Invoice to save:', JSON.stringify(invoiceToSave, null, 2));
        await saveInvoiceData(invoiceToSave);
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
        default:
            console.log('Unhandled webhook event:', eventType);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
};

exports.manualInvoiceAdd = async (req, res) => {
    await handleInvoiceAdd(req.body);
    res.status(200).json({ message: 'Manual invoice add processed successfully' });
};

exports.manualInvoiceEdit = async (req, res) => {
    await handleInvoiceEdit(req.body);
    res.status(200).json({ message: 'Manual invoice edit processed successfully' });
};

exports.manualInvoiceDel = async (req, res) => {
    await handleInvoiceDel(req.body);
    res.status(200).json({ message: 'Manual invoice delete processed successfully' });
};

exports.manualContractorAdd = async (req, res) => {
    await handleContractorAdd(req.body);
    res.status(200).json({ message: 'Manual contractor add processed successfully' });
};

exports.manualPaymentAdd = async (req, res) => {
    await handlePaymentAdd(req.body);
    res.status(200).json({ message: 'Manual payment add processed successfully' });
};

exports.manualWarehouseGoodChangeState = async (req, res) => {
    await handleWarehouseGoodChangeState(req.body);
    res.status(200).json({ message: 'Manual warehouse good change state processed successfully' });
};