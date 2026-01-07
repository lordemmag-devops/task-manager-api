const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'OK',
      database: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({error: 'Database connection failed'});
  }
});

module.exports = router;