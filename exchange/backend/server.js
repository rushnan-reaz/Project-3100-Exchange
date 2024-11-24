const express = require('express');
const cors = require('cors');   
const bodyParser = require('body-parser');
const path = require('path');
const db = require("../db");
const router = require('../routes'); 

const app = express();
const port = process.env.PORT || 8000;

// DB connection
db.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Add this to continue the middleware chain
});

// API routes
app.use('/api', router);

// Static files
app.use('/upload', express.static(path.join(__dirname, '/../upload')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
    } catch (err) {
        res.send('Error in loading file');
    }
});

// Server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
});
