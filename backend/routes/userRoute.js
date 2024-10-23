import express from "express"; // Importing express to create a router
import { authUser, registerUser, allUsers } from "../controllers/userController.js"; // Importing user-related controller functions
import { protect } from "../middleware/authMiddleware.js"; // Importing the 'protect' middleware to protect routes

const router = express.Router(); // Initializing the express router

// Route to handle user signup
// POST /api/users/signup - Registers a new user
router.route("/signup").post(registerUser);

// Route to handle user login (authentication)
// POST /api/users/login - Authenticates a user and returns a token
router.route("/login").post(authUser);

// Route to get all users (search functionality supported)
// GET /api/users/ - Protected route that retrieves users (excludes logged-in user)
router.route("/").get(protect, allUsers);

export default router; // Exporting the router to be used in the main application
