const mongoose = require('mongoose');

const invoiceContentSchema = new mongoose.Schema({
    invoicecontent_id: Number,
    name: String,
    count: Number,
    unit: String,
    price: Number,
    netto: Number,
    brutto: Number,
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
});

const InvoiceContent = mongoose.model('InvoiceContent', invoiceContentSchema);

module.exports = InvoiceContent;