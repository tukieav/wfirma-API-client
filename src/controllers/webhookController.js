const pool = require('../db');

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    // Przykład dostępu do danych w obiekcie
    const { invoices, status, metainfo } = data;
    const invoiceDetails = invoices['0'].invoice;
    const { limit, page, total } = invoices.parameters;
    const { code } = status;
    const { company_id, created, object_id, object_name, webhook_event, webhook_id } = metainfo;

    console.log('Invoice Details:', invoiceDetails);
    console.log('Parameters:', { limit, page, total });
    console.log('Status Code:', code);
    console.log('Metainfo:', { company_id, created, object_id, object_name, webhook_event, webhook_id });

    const webhookKey = 'aca700257b337ba79e6254232d60ec99';

    res.status(200).json({ webhook_key: webhookKey });
};