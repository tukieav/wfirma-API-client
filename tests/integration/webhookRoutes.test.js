const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

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

test('POST /webhook should handle webhook', async () => {
    const response = await request(app)
        .post('/webhook')
        .send({ metainfo: { webhook_event: 'invoice/add' }, invoices: [{ invoice: { id: 1 } }] });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Webhook processed successfully');
});