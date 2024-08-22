const mongoose = require('mongoose');

// Definicja schematu dla zawartości faktury
const invoiceContentSchema = new mongoose.Schema({
    invoicecontent_id: Number,
    name: String,
    count: Number,
    unit: String,
    price: Number,
    netto: Number,
    brutto: Number,
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' } // Użycie ObjectId
});

const InvoiceContent = mongoose.model('InvoiceContent', invoiceContentSchema);

module.exports = InvoiceContent;