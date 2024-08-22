const wfirmaService = require('../services/wfirmaService');
const { saveInvoiceData, deleteInvoiceData } = require('./invoiceController');

// Obsługa dodawania faktury
const handleInvoiceAdd = async (req, res) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(req.body.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
        
        if (!invoiceData || !invoiceData.invoices || !invoiceData.invoices[0] || !invoiceData.invoices[0].invoice) {
            throw new Error('Invoice data is missing');
        }

        const invoiceToSave = invoiceData.invoices[0].invoice;
        const formattedInvoiceData = {
            contractor_detail: invoiceToSave.contractor_detail,
            invoice: {
                id: invoiceToSave.id,
                fullnumber: invoiceToSave.fullnumber,
            },
            invoicecontents: invoiceToSave.invoicecontents,
            vat_contents: invoiceToSave.vat_contents
        };

        console.log('Invoice to save:', JSON.stringify(formattedInvoiceData, null, 2));
        await saveInvoiceData(formattedInvoiceData);
        res.status(200).send('Invoice added successfully');
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error adding invoice');
    }
};

// Obsługa edycji faktury
const handleInvoiceEdit = async (req, res) => {
    try {
        const invoiceData = await wfirmaService.getInvoiceById(req.body.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));

        if (!invoiceData || !invoiceData.invoices || !invoiceData.invoices[0] || !invoiceData.invoices[0].invoice) {
            throw new Error('Invoice data is missing');
        }

        const invoiceToSave = invoiceData.invoices[0].invoice;
        const formattedInvoiceData = {
            contractor_detail: invoiceToSave.contractor_detail,
            invoice: {
                id: invoiceToSave.id,
                fullnumber: invoiceToSave.fullnumber,
            },
            invoicecontents: invoiceToSave.invoicecontents,
            vat_contents: invoiceToSave.vat_contents
        };

        console.log('Invoice to save:', JSON.stringify(formattedInvoiceData, null, 2));

        // Usunięcie starej faktury
        await deleteInvoiceData(invoiceToSave.id);

        // Zapis nowej faktury
        await saveInvoiceData(formattedInvoiceData);
        res.status(200).send('Invoice edited successfully');
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error editing invoice');
    }
};

// Obsługa usuwania faktury
const handleInvoiceDel = async (req, res) => {
    try {
        await deleteInvoiceData(req.body.id);
        res.status(200).send('Invoice deleted successfully');
    } catch (error) {
        console.error('Error deleting invoice data:', error.message);
        res.status(500).send('Error deleting invoice');
    }
};

// Obsługa dodawania kontrahenta
const handleContractorAdd = async (req, res) => {
    // Implementacja funkcji
    res.status(200).send('Contractor added successfully');
};

// Obsługa dodawania płatności
const handlePaymentAdd = async (req, res) => {
    // Implementacja funkcji
    res.status(200).send('Payment added successfully');
};

// Obsługa zmiany stanu towaru w magazynie
const handleWarehouseGoodChangeState = async (req, res) => {
    // Implementacja funkcji
    res.status(200).send('Warehouse good state changed successfully');
};

module.exports = {
    handleInvoiceAdd,
    handleInvoiceEdit,
    handleInvoiceDel,
    handleContractorAdd,
    handlePaymentAdd,
    handleWarehouseGoodChangeState
};