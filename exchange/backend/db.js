const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); // Load environment variables

const url = process.env.MONGO_URI;

const connect = async () => {
    try {
        if (!url) {
            throw new Error("Database connection URL is undefined. Please check your .env file or environment variables.");
        }
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process to avoid running a broken app
    }
};

console.log("MongoDB URI:", url); // Debug the URI being loaded

module.exports = { connect };
