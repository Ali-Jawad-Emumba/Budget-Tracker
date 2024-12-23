import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import adminRoutes from "./routes/admin-routes.js";
import userRoutes from "./routes/user-routes.js";
import cors from "cors";
dotenv.config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use(adminRoutes);
app.use(userRoutes);
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
