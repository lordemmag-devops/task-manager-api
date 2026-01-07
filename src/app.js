const express = require('express');
const app = express();
const healthRoutes = require('./routes/health.routes');

app.use('/api', healthRoutes);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

module.exports = app;