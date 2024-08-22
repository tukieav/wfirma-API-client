const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Invoice = require('../models/Invoice');

const saveInvoiceData = async (invoice) => {
    try {
        const invoiceId = invoice.id;
        const objectId = ObjectId.isValid(invoiceId) ? new ObjectId(invoiceId) : new ObjectId(); 
        const invoiceDoc = new Invoice({
            _id: objectId,
            invoice_id: invoiceId,
            fullnumber: invoice.fullnumber,
            contractor_id: invoice.contractor_id
        });

        await invoiceDoc.save();
        console.log('Invoice saved:', invoiceDoc);
    } catch (error) {
        console.error('Error saving invoice data:', error);
        throw error;
    }
};

const deleteInvoiceData = async (invoiceId) => {
    try {
        const objectId = ObjectId.isValid(invoiceId) ? new ObjectId(invoiceId) : invoiceId;
        await InvoiceContent.deleteMany({ invoice_id: objectId });
        await VatContent.deleteMany({ invoice_id: objectId });
        await Invoice.findOneAndDelete({ _id: objectId });
        console.log(`Invoice with ID ${invoiceId} and its contents deleted`);
    } catch (error) {
        console.error('Error deleting invoice data:', error);
        throw error;
    }
};

module.exports = {
    saveInvoiceData,
    deleteInvoiceData
};