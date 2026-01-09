const express = require('express');
const pool = require('../config/db');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const task = await pool.query(
        'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, description, req.user.id]
    );

    res.status(201).json(task.rows[0]);
});

// Get all users tasks
router.get('/', auth, async (req, res) => {
    const tasks = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
        [req.user.id]
    );

    res.json(tasks.rows);
});

// Update task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status } = req.body;

    const task = await pool.query(
        `UPDATE tasks 
        SET title = COALESCE($1, title),
            description = COALESCE($2, description),
            status = COALESCE($3, status)
        WHERE id = $4 AND user_id = $5
        RETURNING *`,
        [title, description, status, req.params.id, req.user.id]
    );

    if (task.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task.rows[0]);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    const task = await pool.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
        [req.params.id, req.user.id]
    );

    if (task.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;