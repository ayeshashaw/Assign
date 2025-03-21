const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

app.use(helmet());

app.use(express.json());

const logStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

const dummyAuthMiddleware = (role) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer dummy-token') {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    
    const userRole = req.headers['role']; 
    if (!userRole || userRole !== role) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
};

const courseRouter = express.Router();

courseRouter.get('/courses', (req, res) => {
    res.json({ message: 'Courses retrieved successfully' });
});

courseRouter.post('/courses', dummyAuthMiddleware('admin'), (req, res) => {
    res.json({ message: 'Course created successfully' });
});

courseRouter.put('/courses/:id', dummyAuthMiddleware('admin'), (req, res) => {
    res.json({ message: `Course ${req.params.id} updated successfully` });
});

courseRouter.delete('/courses/:id', dummyAuthMiddleware('admin'), (req, res) => {
    res.json({ message: `Course ${req.params.id} deleted successfully` });
});

app.use('/api', courseRouter);

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';
    
    logStream.write(`${new Date().toISOString()} - Error: ${err.stack}\n`);
    
    res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
    console.log(`LMS application running on http://localhost:${port}`);
});
