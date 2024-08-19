const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
    contractor_id: Number,
    altname: String,
    phone: String,
    email: String,
    name: String,
    nip: String,
    street: String,
    zip: String,
    city: String,
    country: String
});

const invoiceSchema = new mongoose.Schema({
    invoice_id: Number,
    fullnumber: String,
    contractor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }
});

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

const vatContentSchema = new mongoose.Schema({
    vat_content_id: Number,
    netto: Number,
    tax: Number,
    brutto: Number,
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
});

const Contractor = mongoose.model('Contractor', contractorSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);
const InvoiceContent = mongoose.model('InvoiceContent', invoiceContentSchema);
const VatContent = mongoose.model('VatContent', vatContentSchema);

module.exports = { Contractor, Invoice, InvoiceContent, VatContent };