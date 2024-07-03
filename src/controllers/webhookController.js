const config = require('../config/config');
const { parse } = require('../utils/objectParser');

exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', JSON.stringify(data, null, 2)); // Użycie JSON.stringify

    const { invoices, status, metainfo } = data;
    const invoiceDetails = parse(invoices['0'].invoice); // Użycie zaktualizowanego parsera
    const { limit, page, total } = invoices.parameters;
    const { code } = status;
    const { company_id, created, object_id, object_name, webhook_event, webhook_id } = metainfo;

    console.log('Invoice Details:', JSON.stringify(invoiceDetails, null, 2)); // Użycie JSON.stringify
    console.log('Parameters:', { limit, page, total });
    console.log('Status Code:', code);
    console.log('Metainfo:', { company_id, created, object_id, object_name, webhook_event, webhook_id });

    res.status(200).json({ message: 'Webhook processed successfully' });
};