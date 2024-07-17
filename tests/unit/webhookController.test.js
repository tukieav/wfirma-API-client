const { handleWebhook } = require('../../src/controllers/webhookController');
const httpMocks = require('node-mocks-http');

test('should handle webhook', async () => {
    const req = httpMocks.createRequest({
        method: 'POST',
        url: '/webhook',
        body: { 
            metainfo: { webhook_event: 'invoice/add' }, 
            invoices: [{ invoice: { id: 1 } }] 
        }
    });
    const res = httpMocks.createResponse();

    await handleWebhook(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Webhook processed successfully' });
});