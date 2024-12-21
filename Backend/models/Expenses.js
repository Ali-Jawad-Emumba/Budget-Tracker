import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  username: {
    type: String,
    ref: "User",
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
