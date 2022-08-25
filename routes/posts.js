import express from "express";
import { getPosts } from "../controllers/posts.js";
import verifyToken from "../controllers/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getPosts);

export default router;
