const config = require('../config/config');
const objectParse = require('../utils/objectParser');

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    const { invoices, status, metainfo } = data;
    const invoiceDetails = objectParse(invoices['0'].invoice);
    const { limit, page, total } = invoices.parameters;
    const { code } = status;
    const { company_id, created, object_id, object_name, webhook_event, webhook_id } = metainfo;

    console.log('Invoice Details:', invoiceDetails);
    console.log('Parameters:', { limit, page, total });
    console.log('Status Code:', code);
    console.log('Metainfo:', { company_id, created, object_id, object_name, webhook_event, webhook_id });

    const webhookKey = config.webhookKey;

    res.status(200).json({ webhook_key: webhookKey });
};