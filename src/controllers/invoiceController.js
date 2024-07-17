const pool = require('../db');

const saveData = async (client, query, values) => {
    const result = await client.query(query, values);
    return result.rows[0].id;
};

const saveInvoiceData = async (invoiceData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Save contractor data
        const contractor = invoiceData.contractor_detail;
        if (!contractor) {
            throw new Error('Contractor data is missing');
        }
        const contractorId = await saveData(client, 
            `INSERT INTO Contractors (contractor_id, altname, phone, email, name, nip, street, zip, city, country)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             ON CONFLICT (contractor_id) DO UPDATE SET
             altname = EXCLUDED.altname, phone = EXCLUDED.phone, email = EXCLUDED.email, name = EXCLUDED.name,
             nip = EXCLUDED.nip, street = EXCLUDED.street, zip = EXCLUDED.zip, city = EXCLUDED.city, country = EXCLUDED.country
             RETURNING contractor_id`,
            [contractor.id, contractor.altname, contractor.phone, contractor.email, contractor.name, contractor.nip, contractor.street, contractor.zip, contractor.city, contractor.country]
        );

        // Save invoice data
        const invoice = invoiceData.invoice;
        if (!invoice) {
            throw new Error('Invoice data is missing');
        }
        const invoiceId = await saveData(client, 
            `INSERT INTO Invoices (invoice_id, fullnumber, contractor_id)
             VALUES ($1, $2, $3)
             ON CONFLICT (invoice_id) DO UPDATE SET
             fullnumber = EXCLUDED.fullnumber, contractor_id = EXCLUDED.contractor_id
             RETURNING invoice_id`,
            [invoice.id, invoice.fullnumber, contractorId]
        );

        // Save invoice contents
        const invoiceContents = invoiceData.invoicecontents;
        if (!invoiceContents) {
            throw new Error('Invoice contents are missing');
        }
        for (const key in invoiceContents) {
            const content = invoiceContents[key].invoicecontent;
            await saveData(client, 
                `INSERT INTO InvoiceContents (invoicecontent_id, name, count, unit, price, netto, brutto, invoice_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 ON CONFLICT (invoicecontent_id) DO UPDATE SET
                 name = EXCLUDED.name, count = EXCLUDED.count, unit = EXCLUDED.unit, price = EXCLUDED.price,
                 netto = EXCLUDED.netto, brutto = EXCLUDED.brutto, invoice_id = EXCLUDED.invoice_id`,
                [content.id, content.name, content.count, content.unit, content.price, content.netto, content.brutto, invoiceId]
            );
        }

        // Save VAT contents
        const vatContents = invoiceData.vat_contents;
        if (!vatContents) {
            throw new Error('VAT contents are missing');
        }
        for (const key in vatContents) {
            const vatContent = vatContents[key].vat_content;
            await saveData(client, 
                `INSERT INTO VatContents (vat_content_id, netto, tax, brutto, invoice_id)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (vat_content_id) DO UPDATE SET
                 netto = EXCLUDED.netto, tax = EXCLUDED.tax, brutto = EXCLUDED.brutto, invoice_id = EXCLUDED.invoice_id`,
                [vatContent.id, vatContent.netto, vatContent.tax, vatContent.brutto, invoiceId]
            );
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during transaction:', error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    saveInvoiceData,
    // inne eksporty, jeśli są
};