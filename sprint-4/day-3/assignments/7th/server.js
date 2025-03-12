const express = require('express');
const redis = require('redis');

// Create Redis Client
const client = redis.createClient();

// Handle Redis connection
client.on('connect', () => {
    console.log('✅ Connected to Redis');
});

client.on('error', (err) => {
    console.error('❌ Redis error:', err);
});

const app = express();
const PORT = 3000;

// Route to store key-value pair
app.get('/store', (req, res) => {
    const key = 'name';
    const value = 'John Doe';

    // Store key-value in Redis
    client.set(key, value, (err, reply) => {
        if (err) {
            return res.status(500).send('Failed to store key-value');
        }
        console.log('Key-Value stored:', reply);
        res.send(`Key-Value pair stored: ${key} -> ${value}`);
    });
});

// Route to retrieve and delete key-value pair
app.get('/retrieve', (req, res) => {
    const key = 'name';

    // Retrieve key-value from Redis
    client.get(key, (err, value) => {
        if (err) {
            return res.status(500).send('Failed to retrieve key');
        }

        if (value) {
            console.log('Key-Value retrieved:', value);

            // Delete the key after retrieval
            client.del(key, (err, response) => {
                if (err) {
                    return res.status(500).send('Failed to delete key');
                }

                console.log('Key deleted successfully');
                res.send(`Retrieved and deleted key-value: ${key} -> ${value}`);
            });
        } else {
            res.send('Key does not exist');
        }
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
