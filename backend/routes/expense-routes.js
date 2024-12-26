import { Router } from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import dotenv from "dotenv";
import {
  addNewExpense,
  deleteExpense,
  editExpense,
  getAllUsersExpensesForChart,
  getAllUsersExpensesForTable,
  getAllUsersTotalYearExpense,
  getUserAllExpensesForChart,
  getUserExpenses,
  getUserTotalYearExpense,
} from "../controllers/expense-controllers.js";
dotenv.config();

const router = Router();
export default router;

//add expense
router.post("/user/:id/expenses", authMiddleware, async (req, res) => {
  await addNewExpense(req, res);
});

//edit expense
router.patch("/expenses/:id", authMiddleware, async (req, res) => {
  await editExpense(req, res);
});

///delete expense
router.delete("/expenses/:id", authMiddleware, async (req, res) => {
  await deleteExpense(req, res);
});

//all users expneses for expanse table
router.get(
  "/admin/all-users-expenses-with-pagination",
  authMiddleware,
  async (req, res) => {
    await getAllUsersExpensesForTable(req, res);
  }
);

//all userss expenses
router.get("/admin/all-users-expenses", authMiddleware, async (req, res) => {
  await getAllUsersExpensesForChart(req,res)
});

//get total year expneses for admin
router.get("/admin/users/total-year-expense", async (req, res) => {
 await getAllUsersTotalYearExpense(req,res)
});
//get expenses of a user
router.get("/user/:id/expenses", authMiddleware, async (req, res) => {
 await getUserExpenses(req,res)
});

//user all expenses for chart
router.get("/user/:id/all-expenses", authMiddleware, async (req, res) => {
  await getUserAllExpensesForChart(req, res)
});

//get toatl year expense for a user
router.get("/user/:id/total-year-expense", authMiddleware, async (req, res) => {
  await getUserTotalYearExpense(req, res)
});
