import { Router } from "express";
import User from "../models/User.js";
const router = Router();

export default router;

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find(); // This should return all users from the database
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.post("/addUser", async (req, res) => {
  try {
    // Ensure req.body has a username field
    const { username } = req.body;

    console.log(req.body);
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const newUser = new User({
      username: username, // Correctly setting the username
    });

    await newUser.save();
    res.json({ message: `User saved: ${username}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user", error: error.message });
  }
});

router.get("/deleteAll", async (req, res) => {
  try {
    await User.deleteMany({}); // Deletes all users in the 'users' collection
    res.send("All users have been deleted.");
  } catch (error) {
    res.send("Error clearing users:", error);
  }
});
