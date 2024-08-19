const Contractor = require('../models/Contractor'); // Dodaj ten import
const Invoice = require('../models/Invoice');
const InvoiceContent = require('../models/InvoiceContent');
const VatContent = require('../models/VatContent');

const saveInvoiceData = async (invoiceData) => {
    try {
        console.log('Received invoice data:', JSON.stringify(invoiceData, null, 2));
        console.log('Saving invoice data:', JSON.stringify(invoiceData, null, 2));

        // Save contractor data
        const contractor = invoiceData.contractor_detail;
        if (!contractor) {
            throw new Error('Contractor data is missing');
        }
        const contractorDoc = await Contractor.findOneAndUpdate(
            { contractor_id: contractor.id },
            contractor,
            { upsert: true, new: true }
        );
        console.log('Contractor saved:', contractorDoc);

        // Save invoice data
        const invoice = invoiceData.invoice;
        if (!invoice) {
            throw new Error('Invoice data is missing');
        }
        const invoiceDoc = await Invoice.findOneAndUpdate(
            { invoice_id: invoice.id },
            { ...invoice, contractor_id: contractorDoc._id },
            { upsert: true, new: true }
        );
        console.log('Invoice saved:', invoiceDoc);

        // Save invoice contents
        const invoiceContents = invoiceData.invoicecontents;
        if (!invoiceContents) {
            throw new Error('Invoice contents are missing');
        }
        for (const key in invoiceContents) {
            const content = invoiceContents[key].invoicecontent;
            const contentDoc = await InvoiceContent.findOneAndUpdate(
                { invoicecontent_id: content.id },
                { ...content, invoice_id: invoiceDoc._id },
                { upsert: true, new: true }
            );
            console.log('Invoice content saved:', contentDoc);
        }

        // Save VAT contents
        const vatContents = invoiceData.vat_contents;
        if (!vatContents) {
            throw new Error('VAT contents are missing');
        }
        for (const key in vatContents) {
            const vatContent = vatContents[key].vat_content;
            const vatContentDoc = await VatContent.findOneAndUpdate(
                { vat_content_id: vatContent.id },
                { ...vatContent, invoice_id: invoiceDoc._id },
                { upsert: true, new: true }
            );
            console.log('VAT content saved:', vatContentDoc);
        }
    } catch (error) {
        console.error('Error saving invoice data:', error);
        throw error;
    }
};

module.exports = {
    saveInvoiceData
};