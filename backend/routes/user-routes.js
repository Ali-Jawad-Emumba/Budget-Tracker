import { Router } from "express";
import User from "../models/User.js";
import Expense from "../models/Expenses.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

export default router;

//signup
router.post("/user", async (req, res) => {
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

//get expenses of a user
router.get("/user/:id/expenses", authMiddleware, async (req, res) => {
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

//user all expenses for chart
router.get("/user/:id/all-expenses", authMiddleware, async (req, res) => {
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

//get toatl year expense for a user
router.get("/user/:id/total-year-expense",authMiddleware, async (req, res) => {
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