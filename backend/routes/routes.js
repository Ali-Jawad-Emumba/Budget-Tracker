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
const JWT_REFRESH_KEY = `${process.env.JWT_REFRESH_KEY}`;
const EMAIL = `${process.env.EMAIL}`;
const PASS = `${process.env.APP_PASSWORD}`;
const ADMIN_ID = `${process.env.ADMIN_ID}`;
export default router;

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const { page, limit = 10, sort, search } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const users = await User.find()
      .skip((pageNumber - 1) * limitNumber) /// Skip records for previous pages
      .limit(limitNumber) // Limit the number of records
      .exec();
    const totalRecords = await User.countDocuments();
    if (!users) {
      return res.status(404).json({ message: "No expenses found" });
    }
    let result = [...users];

    if (sort) {
      switch (sort) {
        case "name":
          result = result.sort((a, b) =>
            a.firstname === b.firstname ? 0 : a.firstname < b.firstname ? -1 : 1
          );
          break;
        case "email":
          result = result.sort((a, b) =>
            a.email === b.email ? 0 : a.email < b.email ? -1 : 1
          );
          break;
        case "role":
          result = result.sort((a, b) => (a._id !== ADMIN_ID ? 1 : -1));
          break;
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((user) =>
        [user.firstname, user.lastname, user.email].some((field) =>
          field.toLowerCase().includes(searchLower)
        )
      );
    }
    res.json({
      totalPages: Math.ceil(totalRecords / limitNumber),
      currentPage: pageNumber,
      totalRecords,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get(
  "/all-users-expenses-with-pagination",
  authMiddleware,
  async (req, res) => {
    try {
      const { page, limit = 10, sort, date, search } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      const expenses = await Expense.find()
        .skip((pageNumber - 1) * limitNumber) // Skip records for previous pages
        .limit(limitNumber) // Limit the number of records
        .exec();
      const totalRecords = await User.countDocuments();
      if (!expenses) {
        return res.status(404).json({ message: "No expenses found" });
      }
      let result = [...expenses];
      if (sort) {
        switch (sort) {
          case "low to high":
            result = result.sort((a, b) =>
              a.price === b.price ? 0 : a.price < b.price ? -1 : 1
            );
            break;
          case "high to low":
            result = result.sort((a, b) =>
              a.price === b.price ? 0 : a.price < b.price ? 1 : -1
            );
            break;
          case "old to new":
            result = result.sort((a, b) =>
              a.date === b.date
                ? 0
                : new Date(a.date) > new Date(b.date)
                ? 1
                : -1
            );
            break;
          case "new to old":
            result = result.sort((a, b) =>
              a.date === b.date
                ? 0
                : new Date(a.date) > new Date(b.date)
                ? -1
                : 1
            );
            break;
        }
      }
      if (date) {
        result = result.filter(
          (expense) =>
            new Date(expense.date).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
        );
      }
      if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter((user) =>
          [user.firstname, user.lastname, user.email].some((field) =>
            field.toLowerCase().includes(searchLower)
          )
        );
      }
      res.json({
        totalPages: Math.ceil(totalRecords / limitNumber),
        currentPage: pageNumber,
        totalRecords,
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);
router.get("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const keepLoggedIn = req.query.RememberMe;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.json({ userExists: false });
    }
    const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1h" });
    if (keepLoggedIn) {
      const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({
        refreshToken,
        token: token,
        userExists: true,
        userData: user,
      });
    } else {
      res.status(200).json({
        token: token,
        userExists: true,
        userData: user,
      });
    }
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
    const { page, limit = 10, sort, date, search } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const expenses = await Expense.find({ userId: id })
      .skip((pageNumber - 1) * limitNumber) // Skip records for previous pages
      .limit(limitNumber) // Limit the number of records
      .exec();
    const totalRecords = await Expense.countDocuments();
    if (!expenses) {
      return res.status(404).json({ mssage: "Expenses not found" });
    }
    let result = [...expenses];
    if (sort) {
      switch (sort) {
        case "low to high":
          result = result.sort((a, b) =>
            a.price === b.price ? 0 : a.price < b.price ? -1 : 1
          );
          break;
        case "high to low":
          result = result.sort((a, b) =>
            a.price === b.price ? 0 : a.price < b.price ? 1 : -1
          );
          break;
        case "old to new":
          result = result.sort((a, b) =>
            a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? 1 : -1
          );
          break;
        case "new to old":
          result = result.sort((a, b) =>
            a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? -1 : 1
          );
          break;
      }
    }
    if (date) {
      result = result.filter(
        (expense) =>
          new Date(expense.date).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      totalPages: Math.ceil(totalRecords / limitNumber),
      currentPage: pageNumber,
      totalRecords,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/users/:id/all-expenses", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const expenses = await Expense.find({ userId: id });

    if (!expenses) {
      return res.status(404).json({ mssage: "Expenses not found" });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/all-users-expenses", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find();

    if (!expenses) {
      return res.status(404).json({ mssage: "Expenses not found" });
    }
    res.json(expenses);
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

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.findByIdAndDelete(id);

    res.json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
});
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await User.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.json(expense);
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
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1h" });

    const resetUrl = `http://localHost:4200/reset-password?token=${resetToken}&email=${email}`;

    const mailOptions = {
      from: { name: "Budget Tracker", address: EMAIL },
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello, \n\nPlease click the following link to reset your password: \n\n${resetUrl}\n\nThe link will expire in 1 hour.`,
      html: `<p>Hello,</p><p>Please click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>The link will expire in 1 hour.</p>`,
    };

    const sendEmail = async () => await transporter.sendMail(mailOptions);
    sendEmail();
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(403); // Forbidden

  jwt.verify(refreshToken, JWT_REFRESH_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign({ id: user.id }, JWT_KEY, {
      expiresIn: "1h",
    });
    res.json({ token: newAccessToken, id: user.id });
  });
});
router.get("/users/:id/total-year-expense", async (req, res) => {
  const userId = req.params.id;

  try {
    const expenses = await Expense.find({ userId });

    if (!expenses) {
      res.status(404).json({ message: "Expenses Not found" });
    }
    const yearFiltered = expenses.filter(
      (expense) =>
        new Date(expense.date).getFullYear() === new Date().getFullYear()
    );
    const yearExpense = yearFiltered.reduce(
      (sum, expense) => (sum += expense.price),
      0
    );
    res.json(yearExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
