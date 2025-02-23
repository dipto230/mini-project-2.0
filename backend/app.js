const express = require('express');
const cors = require('cors');
const db = require('./db/db'); 
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Load All Routes Automatically
readdirSync('./routes').forEach((file) => {
    app.use('/api/v1', require(`./routes/${file}`));
});

// Start the server
const server = async () => {
    await db(); 
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
};

server();
