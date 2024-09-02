const wfirmaService = require('../services/wfirmaService');
const { saveInvoiceData, deleteInvoiceData } = require('./invoiceController');
const { saveContractorData, savePaymentData, saveWarehouseGoodData } = require('./dataController');

// Obsługa dodawania faktury
const handleInvoiceAdd = async (req, res) => {
    try {
        // Pobranie danych faktury z API wFirma
        const invoiceData = await wfirmaService.getInvoiceById(req.body.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));
        
        // Sprawdzenie, czy dane faktury są dostępne
        if (!invoiceData || !invoiceData.invoices || !invoiceData.invoices[0] || !invoiceData.invoices[0].invoice) {
            throw new Error('Invoice data is missing');
        }

        // Formatowanie danych faktury do zapisania
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
        
        // Zapisanie danych faktury
        await saveInvoiceData(formattedInvoiceData);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error adding invoice');
    }
};

// Obsługa edycji faktury
const handleInvoiceEdit = async (req, res) => {
    try {
        // Pobranie danych faktury z API wFirma
        const invoiceData = await wfirmaService.getInvoiceById(req.body.id);
        console.log('Invoice data from API:', JSON.stringify(invoiceData, null, 2));

        // Sprawdzenie, czy dane faktury są dostępne
        if (!invoiceData || !invoiceData.invoices || !invoiceData.invoices[0] || !invoiceData.invoices[0].invoice) {
            throw new Error('Invoice data is missing');
        }

        // Formatowanie danych faktury do zapisania
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

// Obsługa usuwania faktury
const handleInvoiceDel = async (req, res) => {
    try {
        // Usunięcie danych faktury
        await deleteInvoiceData(req.body.id);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error deleting invoice data:', error.message);
        res.status(500).send('Error deleting invoice');
    }
};

// Obsługa dodawania kontrahenta
const handleContractorAdd = async (req, res) => {
    try {
        // Pobranie danych kontrahenta z API wFirma
        const contractorData = await wfirmaService.getContractorById(req.body.id);
        console.log('Contractor data from API:', JSON.stringify(contractorData, null, 2));

        // Sprawdzenie, czy dane kontrahenta są dostępne
        if (!contractorData || !contractorData.contractors || !contractorData.contractors[0] || !contractorData.contractors[0].contractor) {
            throw new Error('Contractor data is missing');
        }

        // Formatowanie danych kontrahenta do zapisania
        const contractorToSave = contractorData.contractors[0].contractor;
        console.log('Contractor to save:', JSON.stringify(contractorToSave, null, 2));
        
        // Zapisanie danych kontrahenta
        await saveContractorData(contractorToSave);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching contractor data:', error.message);
        res.status(500).send('Error adding contractor');
    }
};

// Obsługa dodawania płatności
const handlePaymentAdd = async (req, res) => {
    try {
        // Pobranie danych płatności z API wFirma
        const paymentData = await wfirmaService.getPaymentById(req.body.id);
        console.log('Payment data from API:', JSON.stringify(paymentData, null, 2));

        // Sprawdzenie, czy dane płatności są dostępne
        if (!paymentData || !paymentData.payments || !paymentData.payments[0] || !paymentData.payments[0].payment) {
            throw new Error('Payment data is missing');
        }

        // Formatowanie danych płatności do zapisania
        const paymentToSave = paymentData.payments[0].payment;
        console.log('Payment to save:', JSON.stringify(paymentToSave, null, 2));
        
        // Zapisanie danych płatności
        await savePaymentData(paymentToSave);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching payment data:', error.message);
        res.status(500).send('Error adding payment');
    }
};

// Obsługa zmiany stanu towaru magazynowego
const handleWarehouseGoodChangeState = async (req, res) => {
    try {
        // Pobranie danych towaru magazynowego z API wFirma
        const warehouseGoodData = await wfirmaService.getWarehouseGoodById(req.body.id);
        console.log('Warehouse good data from API:', JSON.stringify(warehouseGoodData, null, 2));

        // Sprawdzenie, czy dane towaru magazynowego są dostępne
        if (!warehouseGoodData || !warehouseGoodData.goods || !warehouseGoodData.goods[0] || !warehouseGoodData.goods[0].good) {
            throw new Error('Warehouse good data is missing');
        }

        // Formatowanie danych towaru magazynowego do zapisania
        const warehouseGoodToSave = warehouseGoodData.goods[0].good;
        console.log('Warehouse good to save:', JSON.stringify(warehouseGoodToSave, null, 2));
        
        // Zapisanie danych towaru magazynowego
        await saveWarehouseGoodData(warehouseGoodToSave);
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching warehouse good data:', error.message);
        res.status(500).send('Error changing warehouse good state');
    }
};

module.exports = {
    handleInvoiceAdd,
    handleInvoiceEdit,
    handleInvoiceDel,
    handleContractorAdd,
    handlePaymentAdd,
    handleWarehouseGoodChangeState
};