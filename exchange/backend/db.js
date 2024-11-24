const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const url = "mongodb+srv://rushnan01:GEsOrMY0UmecFyc9@exchange1.fecvq.mongodb.net/?retryWrites=true&w=majority&appName=exchange1";


console.log("MongoDB URI:", url); 

const connect = async () => {
    try {
        if (!url) throw new Error("Database connection URL is undefined");
        await mongoose.connect(url); // Connect to MongoDB
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = { connect };
