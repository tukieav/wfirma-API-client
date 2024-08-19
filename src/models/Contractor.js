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

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;