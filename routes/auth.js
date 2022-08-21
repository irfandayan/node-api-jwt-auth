import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/User.js";
import { registerValidation, loginValidation } from "../validation.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  //   // Let's validate the date before we create a user
  //   const { error } = validationSchema.validate(req.body);

  // Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exist
  const emailExist = await User.findOne({
    email: req.body.email,
  });

  if (emailExist) return res.status(400).send("Email already exists");

  // Hash/Encrypt passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exist
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send("Email is not found");
  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // Create & assigne a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  // res.send("Loged in");
});

export default router;
