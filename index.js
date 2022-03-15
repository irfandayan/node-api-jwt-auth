import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";

const app = express();

// Connect to DB
mongoose.connect(
  "mongodb+srv://irfandayan:dayan%4045%4045@cluster0.psjfd.mongodb.net/cluster0?retryWrites=true&w=majority",
  () => console.log("connected to db!")
);

// Router middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server Up and running "));
