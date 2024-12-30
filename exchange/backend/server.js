const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./db');
const apirouter = require('./routes/Index');
const { sessionMiddleware, logSession } = require('./middleware/session');
const authenticate = require('./middleware/authenticate');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
db.connect();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3000'],
      }
    }
  }));

  
// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    maxAge: 86400 // 24 hours
}));

// Basic middleware
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session configuration
app.use(sessionMiddleware);
app.use(logSession);

// Debug middleware to log requests
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log('Request Headers:', req.headers);
        console.log('Cookies:', req.cookies);
        console.log('Session:', req.session);
        next();
    });
}

// API Routes
app.use('/api', apirouter);

// Serve static files for React
app.use('/upload', express.static(path.join(__dirname, '/../upload'), {
    maxAge: '1d',
    etag: true
}));
app.use(express.static(path.join(__dirname, '/../frontend/build'), {
    maxAge: '1d',
    etag: true
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

module.exports = app;