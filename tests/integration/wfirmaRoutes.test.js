const request = require('supertest');
const app = require('../../src/app');

test('GET /api/wfirma should fetch data from wFirma API', async () => {
    const response = await request(app).get('/api/wfirma');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
});