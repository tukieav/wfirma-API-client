const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhookRoutes');
const wfirmaRoutes = require('./routes/wfirmaRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());

app.use('/webhook', webhookRoutes);
app.use('/api/wfirma', wfirmaRoutes);

app.use(errorHandler);

module.exports = app;