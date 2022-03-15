import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();

dotenv.config();
// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));

// Middlewares
app.use(express.json());

// Router middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server Up and running "));
