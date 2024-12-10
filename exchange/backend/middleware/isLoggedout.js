const createError = require("http-errors");

// Middleware to check if the user is logged out (session-based check)
const isLoggedOut = (req, res, next) => {
  try {
    // Check if the session exists (i.e., the user is logged in)
    if (!req.session.userId) {
      console.log("User is logged out. No active session found.");
      return next(); // Proceed if no session exists, meaning the user is logged out
    }

    // If session exists, the user is logged in
    console.log("User is already logged in.");
    return res.status(403).json({ message: "User is already logged in." });  // User is logged in, block further execution
  } catch (error) {
    console.error("Error in isLoggedOut middleware:", error.message);
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = isLoggedOut;
