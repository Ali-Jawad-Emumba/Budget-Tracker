import mongoose from "mongoose";

// User Schema
const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;