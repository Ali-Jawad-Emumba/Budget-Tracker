import { Router } from "express";
import User from "../models/User.js";
import Expense from "../models/Expenses.js";
const router = Router();

export default router;

router.get("/getAll", async (res) => {
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
router.post("/getUserByEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.json({ userExists: false });
    }

    res.json({ userExists: true, userData: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.post("/getUserById", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id.trim() });
    if (!user) {
      return res.status(404).json({ mssage: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const newUser = new User({ ...req.body });

    await newUser.save();
    res.json({ message: "User saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user", error: error.message });
  }
});
router.post("/addExpense", async (req, res) => {
  try {
    if (!Object.keys(req.body).every((key) => req.body[key])) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({ ...req.body });

    await newExpense.save();
    res.json({ message: "Expense saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving expense", error: error.message });
  }
});
router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedItem = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Error updating item", error });
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
