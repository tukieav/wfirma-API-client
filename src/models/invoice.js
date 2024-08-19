const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoice_id: Number,
    fullnumber: String,
    contractor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;