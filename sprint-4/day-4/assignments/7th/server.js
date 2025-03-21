const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const setupSwagger = require('./swagger/swaggerConfig');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(todoRoutes);

setupSwagger(app);

mongoose.connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
});
