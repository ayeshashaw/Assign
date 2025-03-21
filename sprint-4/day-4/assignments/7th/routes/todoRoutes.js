const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();


router.post('/todos', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send(todo);
    } catch (err) {
        res.status(400).send(err);
    }
});


router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
});


router.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
});


router.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
});


router.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.send('Todo deleted');
});

module.exports = router;
