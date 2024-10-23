import User from "../models/userModel.js"; // Importing the User model
import jwt from "jsonwebtoken"; // Importing the JWT library for token verification
import asyncHandler from "express-async-handler"; // Wrapping async route handlers

// Middleware to protect routes by verifying the JWT token
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extracting the token from the 'Bearer' scheme
            token = req.headers.authorization.split(" ")[1];

            // Decode the token using the JWT secret to get the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and exclude the password field
            req.user = await User.findById(decoded.id).select("-password");

            // Proceed to the next middleware if the token is valid
            next();

        } catch (error) {
            // Respond with a 401 Unauthorized status if token verification fails
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        // Respond with a 401 Unauthorized status if no token is found
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
