const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3000;

app.use(helmet());

app.use(express.json());

const dummyAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    next();
};

const courseRouter = express.Router();

courseRouter.post('/courses', dummyAuthMiddleware, (req, res) => {
    res.json({ message: 'Course created successfully' });
});

courseRouter.put('/courses/:id', dummyAuthMiddleware, (req, res) => {
    res.json({ message: `Course ${req.params.id} updated successfully` });
});

courseRouter.delete('/courses/:id', dummyAuthMiddleware, (req, res) => {
    res.json({ message: `Course ${req.params.id} deleted successfully` });
});

app.use('/api', courseRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`LMS application running on http://localhost:${port}`);
});
