const wfirmaService = require('../services/wfirmaService');
const { saveInvoiceData, deleteInvoiceData } = require('./invoiceController');
const { saveContractorData, savePaymentData, saveWarehouseGoodData } = require('./dataController');

// Zmienne do przechowywania danych
let lastInvoiceData = null;
let lastContractorData = null;
let lastPaymentData = null;
let lastWarehouseGoodData = null;

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
        lastInvoiceData = formattedInvoiceData; // Zapisanie danych do zmiennej
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error adding invoice');
    }
};

// Obsługa zapytania GET dla dodawania faktury
const getInvoiceAdd = async (req, res) => {
    res.status(200).json(lastInvoiceData);
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

        await deleteInvoiceData(invoiceToSave.id);
        await saveInvoiceData(formattedInvoiceData);
        lastInvoiceData = formattedInvoiceData; // Zapisanie danych do zmiennej
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching invoice data:', error.message);
        res.status(500).send('Error editing invoice');
    }
};

// Obsługa zapytania GET dla edycji faktury
const getInvoiceEdit = async (req, res) => {
    res.status(200).json(lastInvoiceData);
};

// Obsługa usuwania faktury
const handleInvoiceDel = async (req, res) => {
    try {
        await deleteInvoiceData(req.body.id);
        lastInvoiceData = null; // Wyczyszczenie danych
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error deleting invoice data:', error.message);
        res.status(500).send('Error deleting invoice');
    }
};

// Obsługa zapytania GET dla usuwania faktury
const getInvoiceDel = async (req, res) => {
    res.status(200).json({ message: 'Invoice deleted' });
};

// Obsługa dodawania kontrahenta
const handleContractorAdd = async (req, res) => {
    try {
        const contractorData = await wfirmaService.getContractorById(req.body.id);
        console.log('Contractor data from API:', JSON.stringify(contractorData, null, 2));

        if (!contractorData || !contractorData.contractors || !contractorData.contractors[0] || !contractorData.contractors[0].contractor) {
            throw new Error('Contractor data is missing');
        }

        const contractorToSave = contractorData.contractors[0].contractor;
        console.log('Contractor to save:', JSON.stringify(contractorToSave, null, 2));
        
        await saveContractorData(contractorToSave);
        lastContractorData = contractorToSave; // Zapisanie danych do zmiennej
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching contractor data:', error.message);
        res.status(500).send('Error adding contractor');
    }
};

// Obsługa zapytania GET dla dodawania kontrahenta
const getContractorAdd = async (req, res) => {
    res.status(200).json(lastContractorData);
};

// Obsługa dodawania płatności
const handlePaymentAdd = async (req, res) => {
    try {
        const paymentData = await wfirmaService.getPaymentById(req.body.id);
        console.log('Payment data from API:', JSON.stringify(paymentData, null, 2));

        if (!paymentData || !paymentData.payments || !paymentData.payments[0] || !paymentData.payments[0].payment) {
            throw new Error('Payment data is missing');
        }

        const paymentToSave = paymentData.payments[0].payment;
        console.log('Payment to save:', JSON.stringify(paymentToSave, null, 2));
        
        await savePaymentData(paymentToSave);
        lastPaymentData = paymentToSave; // Zapisanie danych do zmiennej
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching payment data:', error.message);
        res.status(500).send('Error adding payment');
    }
};

// Obsługa zapytania GET dla dodawania płatności
const getPaymentAdd = async (req, res) => {
    res.status(200).json(lastPaymentData);
};

// Obsługa zmiany stanu towaru magazynowego
const handleWarehouseGoodChangeState = async (req, res) => {
    try {
        const warehouseGoodData = await wfirmaService.getWarehouseGoodById(req.body.id);
        console.log('Warehouse good data from API:', JSON.stringify(warehouseGoodData, null, 2));

        if (!warehouseGoodData || !warehouseGoodData.goods || !warehouseGoodData.goods[0] || !warehouseGoodData.goods[0].good) {
            throw new Error('Warehouse good data is missing');
        }

        const warehouseGoodToSave = warehouseGoodData.goods[0].good;
        console.log('Warehouse good to save:', JSON.stringify(warehouseGoodToSave, null, 2));
        
        await saveWarehouseGoodData(warehouseGoodToSave);
        lastWarehouseGoodData = warehouseGoodToSave; // Zapisanie danych do zmiennej
        res.status(200).json({ webhook_key: process.env.WEBHOOK_KEY });
    } catch (error) {
        console.error('Error fetching warehouse good data:', error.message);
        res.status(500).send('Error changing warehouse good state');
    }
};

// Obsługa zapytania GET dla zmiany stanu towaru magazynowego
const getWarehouseGoodChangeState = async (req, res) => {
    res.status(200).json(lastWarehouseGoodData);
};

module.exports = {
    handleInvoiceAdd,
    handleInvoiceEdit,
    handleInvoiceDel,
    handleContractorAdd,
    handlePaymentAdd,
    handleWarehouseGoodChangeState,
    getInvoiceAdd,
    getInvoiceEdit,
    getInvoiceDel,
    getContractorAdd,
    getPaymentAdd,
    getWarehouseGoodChangeState
};