import User from "../models/userModel.js"; // Importing the User model
import asyncHandler from "express-async-handler"; // Wrapping async functions to handle errors automatically
import generateToken from "../utils/generateToken.js"; // Function to generate JWT tokens
import bcrypt from "bcryptjs"; // Importing bcrypt for password comparison

// Controller to handle user registration
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image } = req.body; // Destructure the user details from the request body

    // Ensure all required fields are provided
    if (!name || !email || !password) {
        res.status(400); // Bad request status
        throw new Error("Please enter all fields."); // Throw error if fields are missing
    }

    // Check if the user already exists based on the email
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400); // Bad request status
        throw new Error("User already exists!"); // Throw error if the user already exists
    }

    // Create a new user
    const user = await User.create({
        name,
        email,
        password,
        image,
    });

    // If user creation is successful, return the user's data along with a token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id), // Generating JWT token for authentication
        });
    } else {
        res.status(400); // Bad request status
        throw new Error("Failed to create user."); // Throw error if user creation fails
    }
});

// Controller to authenticate a user (login)
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    // If user exists and the provided password matches the stored hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id), // Return token for further authenticated requests
        });
    } else {
        res.status(401); // Unauthorized status
        throw new Error("Invalid Email or Password"); // Throw error if authentication fails
    }
});

// Controller to fetch all users, excluding the logged-in user, and supporting search functionality
// /api/user?search=abhishek
export const allUsers = asyncHandler(async (req, res) => {
    // If search query exists, create a keyword to search by name or email with case-insensitive matching
    const keyword = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } }, // Case-insensitive name search
                  { email: { $regex: req.query.search, $options: "i" } }, // Case-insensitive email search
              ],
          }
        : {};

    // Fetch all users matching the search keyword, but exclude the logged-in user
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    // Return the list of users
    res.send(users);
});
