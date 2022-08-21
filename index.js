import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));

// Middlewares
app.use(express.json());

// Router middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, console.log(`Server running on port ${port}`));
