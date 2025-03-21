const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const loggerRoute = require('./routes/logger');

const app = express();
const PORT = 3000;

// Middleware to use routes
app.use('/log', loggerRoute);

// Cron Job to run every minute
cron.schedule('* * * * *', () => {
    const timestamp = new Date().toISOString();
    const logFilePath = path.join(__dirname, 'timestamp.log');

    // Append the timestamp to the log file
    fs.appendFile(logFilePath, `${timestamp}\n`, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
        } else {
            console.log(`Timestamp logged: ${timestamp}`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
