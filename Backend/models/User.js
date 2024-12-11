import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  budgetlimit: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
