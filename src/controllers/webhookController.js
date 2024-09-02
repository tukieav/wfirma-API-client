const wfirmaService = require('../services/wfirmaService'); // Dodaj ten import
const { saveInvoiceData, deleteInvoiceData } = require('./invoiceController');

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
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error adding invoice');
    }
};

// Podobnie zaktualizuj pozostałe funkcje obsługi webhooków
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

        // Usunięcie starej faktury i powiązanych danych
        await deleteInvoiceData(invoiceToSave.id);

        // Zapis nowej faktury
        await saveInvoiceData(formattedInvoiceData);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error editing invoice');
    }
};

const handleInvoiceDel = async (req, res) => {
    try {
        await deleteInvoiceData(req.body.id);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error deleting invoice data:', error.message);
        res.status(500).send('Error deleting invoice');
    }
};

const handleContractorAdd = async (req, res) => {
    // Implementacja funkcji
    res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
};

const handlePaymentAdd = async (req, res) => {
    // Implementacja funkcji
    res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
};

const handleWarehouseGoodChangeState = async (req, res) => {
    // Implementacja funkcji
    res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
};

module.exports = {
    handleInvoiceAdd,
    handleInvoiceEdit,
    handleInvoiceDel,
    handleContractorAdd,
    handlePaymentAdd,
    handleWarehouseGoodChangeState
};