const Invoice = require('../models/Invoice');
const Contractor = require('../models/Contractor');
const InvoiceContent = require('../models/InvoiceContent');
const VatContent = require('../models/VatContent');
const mongoose = require('mongoose');

// Funkcja zapisująca dane faktury
const saveInvoiceData = async (invoiceData) => {
    try {
        // Sprawdzenie, czy kontrahent już istnieje
        const contractorData = invoiceData.contractor_detail;
        let contractor = await Contractor.findOne({ contractor_id: contractorData.id });
        if (!contractor) {
            // Jeśli kontrahent nie istnieje, zapisz nowego kontrahenta
            contractor = new Contractor({
                contractor_id: contractorData.id,
                altname: contractorData.altname,
                phone: contractorData.phone,
                email: contractorData.email,
                name: contractorData.name,
                nip: contractorData.nip,
                street: contractorData.street,
                zip: contractorData.zip,
                city: contractorData.city,
                country: contractorData.country
            });
            await contractor.save();
        } else {
            // Aktualizacja istniejącego kontrahenta
            contractor.altname = contractorData.altname;
            contractor.phone = contractorData.phone;
            contractor.email = contractorData.email;
            contractor.name = contractorData.name;
            contractor.nip = contractorData.nip;
            contractor.street = contractorData.street;
            contractor.zip = contractorData.zip;
            contractor.city = contractorData.city;
            contractor.country = contractorData.country;
            await contractor.save();
        }

        // Sprawdzenie, czy faktura już istnieje
        let invoice = await Invoice.findOne({ invoice_id: invoiceData.invoice.id });
        if (!invoice) {
            // Jeśli faktura nie istnieje, zapisz nową fakturę
            invoice = new Invoice({
                _id: new mongoose.Types.ObjectId(),
                invoice_id: invoiceData.invoice.id,
                fullnumber: invoiceData.invoice.fullnumber,
                contractor_id: contractor._id
            });
            await invoice.save();
        } else {
            // Aktualizacja istniejącej faktury
            invoice.fullnumber = invoiceData.invoice.fullnumber;
            invoice.contractor_id = contractor._id;
            await invoice.save();
        }

        // Usunięcie starych pozycji faktury
        await InvoiceContent.deleteMany({ invoice_id: invoice._id });

        // Zapis nowych pozycji faktury
        for (const key in invoiceData.invoicecontents) {
            const contentData = invoiceData.invoicecontents[key].invoicecontent;
            const invoiceContent = new InvoiceContent({
                invoicecontent_id: contentData.id,
                name: contentData.name,
                count: contentData.count,
                unit: contentData.unit,
                price: contentData.price,
                netto: contentData.netto,
                brutto: contentData.brutto,
                invoice_id: invoice._id
            });
            await invoiceContent.save();
        }

        // Usunięcie starych zawartości VAT
        await VatContent.deleteMany({ invoice_id: invoice._id });

        // Zapis nowych zawartości VAT
        for (const key in invoiceData.vat_contents) {
            const vatData = invoiceData.vat_contents[key].vat_content;
            const vatContent = new VatContent({
                vat_content_id: vatData.id,
                netto: vatData.netto,
                tax: vatData.tax,
                brutto: vatData.brutto,
                invoice_id: invoice._id
            });
            await vatContent.save();
        }
    } catch (error) {
        throw error;
    }
};

// Funkcja usuwająca dane faktury
const deleteInvoiceData = async (invoiceId) => {
    try {
        const invoice = await Invoice.findOne({ invoice_id: invoiceId });
        if (!invoice) {
            throw new Error('Invoice not found');
        }

        await InvoiceContent.deleteMany({ invoice_id: invoice._id });
        await VatContent.deleteMany({ invoice_id: invoice._id });
        await Invoice.deleteOne({ _id: invoice._id });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    saveInvoiceData,
    deleteInvoiceData
};