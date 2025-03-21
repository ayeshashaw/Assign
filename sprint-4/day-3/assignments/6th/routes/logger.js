const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const logFilePath = path.join(__dirname, '../timestamp.log');

router.get('/', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to read log file');
        }
        res.type('text/plain');
        res.send(data);
    });
});

module.exports = router;
