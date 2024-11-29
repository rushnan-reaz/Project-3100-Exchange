const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./db"); // Database connection
const apirouter = require('./routes'); // Import your API routes file

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
db.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Raw Request URL:', req.url); 
    next();
});
app.use((req, res, next) => {
    console.log('Middleware Request URL:', req.originalUrl);
    next();
});
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});


// Set headers for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// API Routes - This ensures that any route starting with '/api' uses the routes defined in 'apirouter'
app.use('/api', apirouter);

// Serve static files for React
app.use('/upload', express.static(path.join(__dirname, '/../upload')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// Catch-all route for React frontend (ensures React app is served for other routes)
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).send('API route not found');
    }
    try {
        res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
    } catch (err) {
        res.status(500).send('Error in loading file');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


