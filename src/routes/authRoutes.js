const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { vulnerableSchema } = require('../validators/vulnerableValidator');

// Mock register and login functions for testing
const register = async (req, res) => {
    res.status(201).json({ message: 'User registered successfully', user: req.body });
};

const vulnerableRegister = async (req, res) => {
    res.status(201).json({ 
        message: 'VULNERABLE: This would be stored in database!', 
        user: req.body,
        warning: 'SQL injection possible here!' 
    });
};

const login = async (req, res) => {
    res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /auth/vulnerable:
 *   post:
 *     summary: VULNERABLE endpoint (for testing)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shows what happens without validation
 */
router.post('/vulnerable', validate(vulnerableSchema), vulnerableRegister);

module.exports = router;