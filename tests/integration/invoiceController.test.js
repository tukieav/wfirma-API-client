const mongoose = require('mongoose');
const { saveInvoiceData, deleteInvoiceData } = require('../../src/controllers/invoiceController');
const Contractor = require('../../src/models/Contractor');
const Invoice = require('../../src/models/Invoice');
const InvoiceContent = require('../../src/models/InvoiceContent');
const VatContent = require('../../src/models/VatContent');

describe('saveInvoiceData', () => {
    beforeEach(async () => {
        await Contractor.deleteMany({});
        await Invoice.deleteMany({});
        await InvoiceContent.deleteMany({});
        await VatContent.deleteMany({});
    });

    test('should save invoice data to the database', async () => {
        const invoiceData = {
            contractor_detail: {
                id: 1,
                altname: 'AltName',
                phone: '123456789',
                email: 'test@example.com',
                name: 'Test Contractor',
                nip: '1234567890',
                street: 'Test Street',
                zip: '00-000',
                city: 'Test City',
                country: 'Test Country',
            },
            invoice: {
                id: 1,
                fullnumber: 'INV-001',
            },
            invoicecontents: {
                0: {
                    invoicecontent: {
                        id: 1,
                        name: 'Item 1',
                        count: 2,
                        unit: 'pcs',
                        price: 100,
                        netto: 200,
                        brutto: 246,
                    },
                },
            },
            vat_contents: {
                0: {
                    vat_content: {
                        id: 1,
                        netto: 200,
                        tax: 46,
                        brutto: 246,
                    },
                },
            },
        };

        await saveInvoiceData(invoiceData);

        const savedInvoice = await Invoice.findOne({ invoice_id: 1 }).populate('contractor_id');
        expect(savedInvoice).toBeTruthy();
        expect(savedInvoice.fullnumber).toBe('INV-001');
        expect(savedInvoice.contractor_id.name).toBe('Test Contractor');
    });

    test('should delete invoice data from the database', async () => {
        const invoiceId = 1;
        await deleteInvoiceData(invoiceId);

        const deletedInvoice = await Invoice.findOne({ invoice_id: invoiceId });
        expect(deletedInvoice).toBeNull();
    });
});