const { saveInvoiceData } = require('../../src/controllers/invoiceController');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Contractor, Invoice, InvoiceContent, VatContent } = require('../../src/models/invoice');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

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

    test('should rollback transaction on error', async () => {
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

        jest.spyOn(Contractor, 'findOneAndUpdate').mockImplementationOnce(() => {
            throw new Error('DB Error');
        });

        await expect(saveInvoiceData(invoiceData)).rejects.toThrow('DB Error');

        const savedInvoice = await Invoice.findOne({ invoice_id: 1 });
        expect(savedInvoice).toBeNull();
    });
});