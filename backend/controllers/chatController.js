import mongoose from "mongoose"; // Importing mongoose for database interaction
import Chat from "../models/chatModel.js"; // Importing the Chat model for accessing chat data
import asyncHandler from "express-async-handler"; // Importing asyncHandler to handle async errors
import User from "../models/userModel.js"; // Importing the User model for accessing user data

// Controller to access or create a one-on-one chat
export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body; // Extracting userId from the request body

    // Check if userId is provided
    if (!userId) {
        res.status(400);
        throw new Error("UserId param not sent");
    }

    // Try to find an existing one-on-one chat between the logged-in user and the provided userId
    let chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [req.user._id, userId] } // Find chats where both the logged-in user and userId are in the chat
    })
    .populate("users", "-password") // Populate user details excluding password
    .populate("latestMessage");

    // Populate the sender's details in the latestMessage
    if (chat) {
        chat = await User.populate(chat, {
            path: "latestMessage.sender",
            select: "name image email"
        });
        res.status(200).json(chat); // Return the existing chat
    } else {
        // If no chat exists, create a new one-on-one chat
        try {
            const newChat = await Chat.create({
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId] // Include both the logged-in user and the provided userId
            });

            const fullChat = await Chat.findById(newChat._id)
                .populate("users", "-password");

            res.status(201).json(fullChat); // Send the newly created chat back to the client
        } catch (error) {
            res.status(500);
            throw new Error("Chat creation failed");
        }
    }
});

// Controller to fetch all chats for the logged-in user
export const fetchChats = asyncHandler(async (req, res) => {
    try {
        // Find all chats where the logged-in user is a participant
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } } // Find chats where the user is part of
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

        // Populate the sender information for the latest message
        await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name image email"
        });

        res.status(200).json(chats); // Return all found chats
    } catch (error) {
        res.status(500).json({ message: "Error fetching chats", error: error.message });
    }
});

// Controller to create a new group chat
export const createGroupChat = asyncHandler(async (req, res) => {
    const { users: usersJSON, name } = req.body;

    // Check if required fields are provided
    if (!usersJSON || !name) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Parse the users array and add the current user to the group
    let users = JSON.parse(usersJSON);
    if (users.length < 2) {
        return res.status(400).json({ message: "A group should have at least 2 users" });
    }
    users.push(req.user._id);

    try {
        // Create the new group chat
        const groupChat = await Chat.create({
            chatName: name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id
        });

        // Fetch the full group chat details
        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(201).json(fullGroupChat); // Return the created group chat
    } catch (error) {
        res.status(500).json({ message: "Error creating group chat", error: error.message });
    }
});

// Controller to rename a group chat
export const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    // Check if both chatId and chatName are provided
    if (!chatId || !chatName) {
        return res.status(400).json({ message: "Please provide both chatId and chatName" });
    }

    try {
        // Find and update the chat's name
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!updatedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Ensure the chat is a group chat
        if (!updatedChat.isGroupChat) {
            return res.status(400).json({ message: "This is not a group chat" });
        }

        res.status(200).json(updatedChat); // Return the updated group chat
    } catch (error) {
        res.status(500).json({ message: "Error renaming group", error: error.message });
    }
});

// Controller to remove a user from a group chat
export const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        // Remove the user from the group
        const removedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } }, // Remove the userId from the users array
            { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!removedChat) {
            res.status(404);
            throw new Error("Chat not found");
        }

        res.status(200).json(removedChat); // Return the updated chat
    } catch (error) {
        res.status(500).json({ message: "Error removing user from group", error: error.message });
    }
});

// Controller to add a user to a group chat
export const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        // Add the user to the group
        const addedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } }, // Add the userId to the users array
            { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!addedChat) {
            res.status(404);
            throw new Error("Chat not found");
        }

        res.status(200).json(addedChat); // Return the updated chat
    } catch (error) {
        res.status(500).json({ message: "Error adding user to group", error: error.message });
    }
});
