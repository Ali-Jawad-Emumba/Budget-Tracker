
import User from '../models/User.js';
import Expense from '../models/Expenses.js'
import dotenv from "dotenv";
dotenv.config();


export const addNewExpense = async (req, res) => {
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
};

export const editExpense = async (req, res) => {
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
};

export const deleteExpense = async (req, res) => {
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
};

export const getAllUsersExpensesForTable = async (req, res) => {
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
};

export const getAllUsersExpensesForChart = async (req, res) => {
  try {
    const expenses = await Expense.find();

    if (!expenses) {
      return res.status(404).json({ mssage: "Expenses not found" });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllUsersTotalYearExpense = async (req, res) => {
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
};

export const getUserExpenses = async (req, res) => {
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
};

export const getUserAllExpensesForChart = async (req, res) => {
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
};

export const getUserTotalYearExpense = async (req, res) => {
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
};
