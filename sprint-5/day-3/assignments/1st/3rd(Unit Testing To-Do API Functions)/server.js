const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

app.post('/todo', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todo', (req, res) => {
    res.json(todos);
});

app.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.task = task;
    res.json(todo);
});

app.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ message: "Deleted successfully" });
});

module.exports = app;
