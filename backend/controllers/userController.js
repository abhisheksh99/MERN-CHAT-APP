import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// @desc    Register new user
// @route   POST /api/user/signup
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image } = req.body;

    // Validate input
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all required fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image: image || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all required fields");
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),
    });
});

// @desc    Get all users or search users
// @route   GET /api/user?search=
// @access  Private
export const allUsers = asyncHandler(async (req, res) => {
    // Verify user is authenticated
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    // Build search query
    const keyword = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
              ],
          }
        : {};

    // Find users excluding the current user
    const users = await User.find({
        ...keyword,
        _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const user = await User.findById(req.user._id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});