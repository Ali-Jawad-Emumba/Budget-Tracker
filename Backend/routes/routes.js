import { Router } from "express";
import User from "../models/User.js";
import Expense from "../models/Expenses.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authmiddleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const JWT_KEY = `${process.env.JWT_KEY}`;
export default router;

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values

    // Parse `page` and `limit` to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const users = await User.find()
      .skip((pageNumber - 1) * limitNumber) // Skip records for previous pages
      .limit(limitNumber) // Limit the number of records
      .exec();
    const totalDocuments = await User.countDocuments();
    if (!users) {
      return res.status(404).json({ message: "No expenses found" });
    }
    res.json({
      totalPages: Math.ceil(totalDocuments / limitNumber),
      currentPage: pageNumber,
      totalRecords: totalDocuments,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.json({ userExists: false });
    }
    const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1h" });
    res.status(200).json({
      token: token,
      userExists: true,
      userData: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/users/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ mssage: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/users", authMiddleware, async (req, res) => {
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
router.post("/users/:id/expenses", authMiddleware, async (req, res) => {
  try {
    if (!Object.keys(req.body).every((key) => req.body[key])) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.params.id;
    const user = await User.findById(userId);
    const username = `${user.firstname} ${user.lastname}`;
    const newExpense = new Expense({ userId, username, ...req.body });

    await newExpense.save();
    res.json({ message: "Expense saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving expense", error: error.message });
  }
});
router.get("/users/:id/expenses", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const { page = 1, limit = 10 } = req.query; // Default values

    // Parse `page` and `limit` to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const expenses = await Expense.find({ userId: id })
      .skip((pageNumber - 1) * limitNumber) // Skip records for previous pages
      .limit(limitNumber) // Limit the number of records
      .exec();
    const totalDocuments = await Expense.countDocuments();
    if (!expenses) {
      return res.status(404).json({ mssage: "Expenses not found" });
    }
    res.json({
      totalPages: Math.ceil(totalDocuments / limitNumber),
      currentPage: pageNumber,
      totalRecords: totalDocuments,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.patch("/expenses/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedItem = await Expense.findByIdAndUpdate(id, updatedData, {
      new: true, //returns the updated document if this is false it will return original doc
    });

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Error updating item", error: error });
  }
});
router.patch("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const updatedItem = await User.findOneAndUpdate({ email }, updatedData, {
      new: true, //returns the updated document if this is false it will return original doc
    });

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Error updating item", error: error });
  }
});
router.delete("/expenses/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the expense exists before trying to delete it
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // If the expense exists, proceed to delete it
    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
});
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the expense exists before trying to delete it
    const expense = await User.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the expense exists, proceed to delete it
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});
router.patch("/users/:id", authMiddleware, async (req, res) => {
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "alijawad04@gmail.com",
    pass: "ogrg fczh cmek nvtr",
  },
});
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token (JWT)
    const resetToken = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1h" });

    // Generate password reset URL with the token
    const resetUrl = `http://localHost:4200/reset-password?token=${resetToken}&email=${email}`;

    // Send email using Nodemailer
    const mailOptions = {
      from: { name: "Your App", address: "alijawad04@gmail.com" },
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello, \n\nPlease click the following link to reset your password: \n\n${resetUrl}\n\nThe link will expire in 1 hour.`,
      html: `<p>Hello,</p><p>Please click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>The link will expire in 1 hour.</p>`,
    };

    (async () => await transporter.sendMail(mailOptions))();
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
