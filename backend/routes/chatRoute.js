import express from "express"; // Import express to create a router
import { protect } from "../middleware/authMiddleware.js"; // Importing the protect middleware to protect routes
import { accessChat, addToGroup, createGroupChat, fetchChats, renameGroup ,removeFromGroup} from "../controllers/chatController.js";

const router = express.Router(); 

// Route to access a chat or create a one-on-one chat
// POST /api/chats/ - Protected route
router.route("/").post(protect, accessChat);

// Route to fetch all chats of the logged-in user
// GET /api/chats/ - Protected route
router.route("/").get(protect, fetchChats);

// Route to create a new group chat
// POST /api/chats/group - Protected route
router.route("/group").post(protect, createGroupChat);

// Route to rename a group chat
// PUT /api/chats/rename-group - Protected route
router.route("/renamegroup").put(protect, renameGroup);

// Route to remove a user from a group chat
// PUT /api/chats/groupremove - Protected route
router.route("/groupremove").put(protect, removeFromGroup);

// Route to add a user to a group chat
// PUT /api/chats/groupadd - Protected route
router.route("/groupadd").put(protect, addToGroup);

export default router; 
