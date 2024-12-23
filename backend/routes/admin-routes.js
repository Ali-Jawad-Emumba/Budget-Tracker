import { Router } from "express";
import User from "../models/User.js";
import Expense from "../models/Expenses.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const ADMIN_ID = `${process.env.ADMIN_ID}`;
export default router;

//get all users
router.get("/admin/users", authMiddleware, async (req, res) => {
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

//all users expneses for expanse table
router.get(
  "/admin/all-users-expenses-with-pagination",
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

//all userss expenses
router.get("/admin/all-users-expenses", authMiddleware, async (req, res) => {
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

//get total year expneses for admin
router.get("/admin/users/total-year-expense", async (req, res) => {
    try {
      const expenses = await Expense.find();
  
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