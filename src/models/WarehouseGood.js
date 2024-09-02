const mongoose = require('mongoose');

const warehouseGoodSchema = new mongoose.Schema({
    good_id: Number,
    name: String,
    quantity: Number,
    unit: String,
    price: Number
});

const WarehouseGood = mongoose.model('WarehouseGood', warehouseGoodSchema);

module.exports = WarehouseGood;