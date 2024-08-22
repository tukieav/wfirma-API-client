const mongoose = require('mongoose');

// Definicja schematu dla faktury
const invoiceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoice_id: Number,
    fullnumber: String,
    contractor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;