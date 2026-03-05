const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create({
        title,
        description,
        user_id: req.user.id
    });

    res.status(201).json(task);
});

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        { title, description, status },
        { new: true, runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;