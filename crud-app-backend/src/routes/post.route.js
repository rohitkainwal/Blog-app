import { Router } from "express";
import { createPost, deletePost, editPost, getPost, getPosts } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-post",authenticate, createPost);
router.get("/get-posts",  getPosts);
router.get("/get-post/:id",  getPost);
router.patch("/edit/:id", authenticate, editPost );
router.delete("/delete/:id", authenticate, deletePost)

export default router