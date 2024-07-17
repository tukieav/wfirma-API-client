const { saveInvoiceData } = require('../../src/controllers/invoiceController');
const pool = require('../../src/db');
const httpMocks = require('node-mocks-http');

jest.mock('../../src/db', () => {
    const mPool = {
        connect: jest.fn().mockResolvedValue({
            query: jest.fn(),
            release: jest.fn(),
        }),
    };
    return mPool;
});

describe('saveInvoiceData', () => {
    let client;

    beforeEach(() => {
        client = {
            query: jest.fn(),
            release: jest.fn(),
        };
        pool.connect.mockResolvedValue(client);
    });

    afterEach(() => {
        jest.clearAllMocks();
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

        client.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Contractor
        client.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Invoice
        client.query.mockResolvedValueOnce({}); // InvoiceContent
        client.query.mockResolvedValueOnce({}); // VatContent

        await saveInvoiceData(invoiceData);

        expect(client.query).toHaveBeenCalledTimes(4);
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Contractors'),
            expect.arrayContaining([1, 'AltName', '123456789', 'test@example.com', 'Test Contractor', '1234567890', 'Test Street', '00-000', 'Test City', 'Test Country'])
        );
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Invoices'),
            expect.arrayContaining([1, 'INV-001', 1])
        );
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO InvoiceContents'),
            expect.arrayContaining([1, 'Item 1', 2, 'pcs', 100, 200, 246, 1])
        );
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO VatContents'),
            expect.arrayContaining([1, 200, 46, 246, 1])
        );
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
        
        test('should throw error if contractor data is missing', async () => {
            const invoiceData = {
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
        
            await expect(saveInvoiceData(invoiceData)).rejects.toThrow('Failed to insert or update invoice');
        });

        client.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Contractor
        client.query.mockRejectedValueOnce(new Error('DB Error')); // Invoice

        await expect(saveInvoiceData(invoiceData)).rejects.toThrow('DB Error');

        expect(client.query).toHaveBeenCalledTimes(3); // BEGIN, Contractor, ROLLBACK
        expect(client.query).toHaveBeenCalledWith('BEGIN');
        expect(client.query).toHaveBeenCalledWith('ROLLBACK');
    });
});