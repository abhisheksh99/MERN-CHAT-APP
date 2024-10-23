import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs"; 

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields.");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await User.create({
        name,
        email,
        password,
        image,
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
        throw new Error("Failed to create user.");
    }
});

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});
