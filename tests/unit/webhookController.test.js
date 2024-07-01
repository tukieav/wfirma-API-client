const { handleWebhook } = require('../../src/controllers/webhookController');
const httpMocks = require('node-mocks-http');

test('should handle webhook', () => {
    const req = httpMocks.createRequest({
        method: 'POST',
        url: '/webhook',
        body: { key: 'value' }
    });
    const res = httpMocks.createResponse();

    handleWebhook(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('Webhook received');
});
