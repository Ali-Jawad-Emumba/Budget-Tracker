import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  budgetlimit: { type: Number, required: true },
  fathername: { type: String },
  gender: { type: String },
  phone: { type: String },
  zipcode: { type: String },
  education: { type: String },
  dob: { type: String },
  address: { type: String },
  jobtitle: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  url: { type: String },
  aboutme: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
