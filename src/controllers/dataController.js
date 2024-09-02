const Contractor = require('../models/Contractor');
const Payment = require('../models/Payment');
const WarehouseGood = require('../models/WarehouseGood');

// Funkcja zapisująca dane kontrahenta
const saveContractorData = async (contractorData) => {
    try {
        let contractor = await Contractor.findOne({ contractor_id: contractorData.id });
        if (!contractor) {
            contractor = new Contractor(contractorData);
            await contractor.save();
        } else {
            Object.assign(contractor, contractorData);
            await contractor.save();
        }
    } catch (error) {
        throw error;
    }
};

// Funkcja zapisująca dane płatności
const savePaymentData = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        await payment.save();
    } catch (error) {
        throw error;
    }
};

// Funkcja zapisująca dane towaru magazynowego
const saveWarehouseGoodData = async (warehouseGoodData) => {
    try {
        const warehouseGood = new WarehouseGood(warehouseGoodData);
        await warehouseGood.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    saveContractorData,
    savePaymentData,
    saveWarehouseGoodData
};