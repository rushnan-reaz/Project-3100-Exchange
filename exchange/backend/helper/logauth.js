const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN;

// Common cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Middleware to generate access and refresh tokens
const generateTokens = (userId) => {
  console.log("Generating tokens for user:", userId);

  const accessToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "15m", // Increased from 1m to 15m for better UX
  });
  console.log("Access token generated:", accessToken);

  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: "7d",
  });
  console.log("Refresh token generated:", refreshToken);

  return { accessToken, refreshToken };
};

// Middleware to set refresh token in cookie
const setRefreshTokenInCookie = (res, refreshToken) => {
  console.log("Setting refresh token in cookie");
  res.cookie("refreshToken", refreshToken, cookieOptions);
  console.log("Refresh token cookie set");
};

// Middleware to verify access token from session
const verifyAccessToken = (req, res, next) => {
  console.log("Verifying access token from session...");
  const token = req.session.accessToken;

  if (!token) {
    console.log("No access token in session");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("Access token verified successfully:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    // Try to refresh the token if it's expired
    return refreshAccessToken(req, res);
  }
};

/// Middleware to refresh access token
const refreshAccessToken = async (req, res) => {
  console.log("Refreshing access token...");
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      console.log("No refresh token provided");
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    console.log("Refresh token verified for user:", decoded.userId);

    // Generate new tokens
    const newTokens = generateTokens(decoded.userId);
    console.log("New tokens generated");

    // Save new access token in session
    req.session.accessToken = newTokens.accessToken;
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          reject(err);
        }
        console.log("Session saved with new access token");
        resolve();
      });
    });

    // Set new refresh token cookie
    setRefreshTokenInCookie(res, newTokens.refreshToken);

    return res.json({
      accessToken: newTokens.accessToken,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.error("Refresh token verification failed:", error.message);
    // Clear invalid tokens and session
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("sessionId", cookieOptions);

    if (req.session) {
      req.session.destroy((err) => {
        if (err) console.error("Session destruction error:", err);
      });
    }

    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Middleware to handle logout
const logout = async (req, res) => {
  console.log("Processing logout request...");

  // If headers already sent, exit early
  if (res.headersSent) {
    console.warn("Headers already sent, skipping logout response");
    return;
  }

  let hasError = false;

  // Clear cookies with a single options object
  const clearOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  };

  try {
    // Clear all cookies
    ["refreshToken", "sessionId", "accessToken"].forEach(cookie => {
      try {
        res.clearCookie(cookie, clearOptions);
      } catch (err) {
        console.error(`Error clearing cookie ${cookie}:`, err);
        hasError = true;
      }
    });

    // Destroy session if it exists
    if (req.session) {
      await new Promise((resolve, reject) => {
        req.session.destroy(err => {
          if (err) {
            console.error("Session destruction error:", err);
            hasError = true;
          }
          resolve();
        });
      });
    }

    // Send single response based on success/failure
    if (!res.headersSent) {
      if (hasError) {
        res.status(500).json({
          success: false,
          message: "Partial logout - some cleanup failed"
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Logged out successfully"
        });
      }
    }

  } catch (error) {
    console.error("Logout error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Error during logout"
      });
    }
  }
};

module.exports = {
  generateTokens,
  setRefreshTokenInCookie,
  verifyAccessToken,
  refreshAccessToken,
  logout,
};
