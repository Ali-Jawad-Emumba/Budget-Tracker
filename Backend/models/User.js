import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // other fields as necessary...
});

const User = mongoose.model("User", userSchema);

export default User;
