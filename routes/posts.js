import express from "express";
import verifyToken from "./verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  //   res.json({
  //     posts: {
  //       title: "my first post",
  //       description: "random data you should not access",
  //     },
  //   });
  res.send(req.user);
});

export default router;
