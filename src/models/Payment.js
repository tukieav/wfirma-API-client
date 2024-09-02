const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_id: Number,
    amount: Number,
    date: Date,
    method: String,
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;