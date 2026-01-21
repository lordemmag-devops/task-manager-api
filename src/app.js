const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/users.routes');
const taskRoutes = require('./routes/tasks.routes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

module.exports = app;