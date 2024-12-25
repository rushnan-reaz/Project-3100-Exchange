// const jwt = require("jsonwebtoken");
// const { refreshAccessToken } = require("../helper/logauth");
// const createError = require("http-errors");

// const jwtAccessKey = process.env.JWT_SECRET;

// const isLoggedIn = async (req, res, next) => {
//   try {
//     console.log("Cookies: ", req.cookies);
//     console.log("Session: ", req.session);

//     const accessToken = req.cookies.accessToken;
//     const refreshToken = req.cookies.refreshToken;

//     // Check if both access and refresh tokens are missing
//     if (!accessToken && !refreshToken) {
//       throw createError(401, "Access Denied! Please log in.");
//     }

//     if (!accessToken || accessToken === "null") {
//       console.log("No valid access token. Attempting to refresh...");

//       // Use refresh token to generate a new access token
//       const newTokens = await refreshAccessToken({ cookies: { refreshToken } }, res);

//       if (!newTokens) {
//         throw createError(403, "Invalid or expired refresh token.");
//       }

//       console.log("New Access Token: ", newTokens.accessToken);

//       // Set new access token in cookies
//       res.cookie("accessToken", newTokens.accessToken, {
//         maxAge: 1 * 60 * 1000, // 1 minute
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });

//       // Decode the new access token to get user info
//       const decoded = jwt.verify(newTokens.accessToken, jwtAccessKey);
//       req.user = decoded.userId;  // Attach the user ID from the decoded token
//       return next();
//     } else {
//       // Access token is present, verify it
//       const decoded = jwt.verify(accessToken, jwtAccessKey);
//       console.log("Decoded Access Token: ", decoded);
//       req.user = decoded.userId;  // Attach the user ID from the decoded token
//       return next();
//     }
//   } catch (error) {
//     console.error("Error in isLoggedIn middleware: ", error.message);
//     next(error);  // Pass the error to the next middleware
//   }
// };

// module.exports = isLoggedIn;
