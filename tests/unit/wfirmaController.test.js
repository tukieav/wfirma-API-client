const { getWfirmaData } = require('../../src/controllers/wfirmaController');
const wfirmaService = require('../../src/services/wfirmaService');
const httpMocks = require('node-mocks-http');

jest.mock('../../src/services/wfirmaService');

test('should fetch data from wFirma API', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const mockData = { companies: [] };

    wfirmaService.findCompanies.mockResolvedValue(mockData);

    await getWfirmaData(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockData);
});

test('should handle error when fetching data from wFirma API', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    wfirmaService.findCompanies.mockRejectedValue(new Error('API Error'));

    await getWfirmaData(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getData()).toBe('Error fetching data from wFirma API');
});