const express = require('express');
const app = express();
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/users.routes');

app.use(express.json());

app.use('/api', healthRoutes);

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

module.exports = app;