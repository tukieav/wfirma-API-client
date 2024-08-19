const mongoose = require('mongoose');

const vatContentSchema = new mongoose.Schema({
    vat_content_id: Number,
    netto: Number,
    tax: Number,
    brutto: Number,
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
});

const VatContent = mongoose.model('VatContent', vatContentSchema);

module.exports = VatContent;