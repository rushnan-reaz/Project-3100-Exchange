const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./db"); // Database connection
const apirouter = require('./routes'); // Import API routes

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
db.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Handle JSON body data
app.use(express.json());

// Logging middleware (optional but useful for debugging)
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

// Set headers for all routes (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// API Routes
app.use('/api', apirouter);

// Serve static files for React
app.use('/upload', express.static(path.join(__dirname, '/../upload')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// Catch-all route for React frontend (serve index.html for all other routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
