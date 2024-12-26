import { Router } from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import dotenv from "dotenv";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  refreshToken,
  resetUserPassword,
  sendPasswordResetLink,
  updateUserProfile,
} from "../controllers/user-controllers.js";
dotenv.config();

const router = Router();


//signup
router.post("/user", async (req, res) => {
  await addNewUser(req, res);
});

///user or admin login
router.get("/user/email/:email", async (req, res) => {
  await loginUser(req, res);
});

//get user data for profile
router.get("/user/:id", authMiddleware, async (req, res) => {
  await getUserProfile(req, res);
});

//reset user password
router.patch("/user/email/:email", async (req, res) => {
  await resetUserPassword(req, res);
});

//delete user
router.delete("/user/:id", authMiddleware, async (req, res) => {
  await deleteUser(req, res);
});

///update user profile patch request
router.patch("/user/:id", authMiddleware, async (req, res) => {
  await updateUserProfile(req,res)
});

///send a reset password link

router.post("/reset-password", async (req, res) => {
  await sendPasswordResetLink(req,res)
});

//get all users
router.get("/admin/users", authMiddleware, async (req, res) => {
  await getAllUsers(req,res)
});

//refresh token
router.post("/refresh-token", (req, res) => {
  refreshToken(req,res)
});

export default router;