const request = require('supertest');
const app = require('../../src/app');

test('POST /webhook should handle webhook', async () => {
    const response = await request(app)
        .post('/webhook')
        .send({ metainfo: { webhook_event: 'invoice/add' }, invoices: [{ invoice: { id: 1 } }] });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Webhook processed successfully');
});