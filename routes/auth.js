import express from "express";
import User2 from "../model/User.js";
import Joi from "@hapi/joi";

const router = express.Router();

// Validation
const validationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  // Let's validate the date before we create a user

  const { error } = validationSchema.validate(req.body);
  //   res.send(error.details[0].message);
  if (error) return res.status(400).send(error.details[0].message);

  const user2 = new User2({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user2.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
