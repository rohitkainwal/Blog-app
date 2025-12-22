import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/create-post", authenticate, upload.single("image"), createPost);
router.get("/get-posts", getPosts);
router.get("/get-post/:id", getPost);
router.patch("/edit/:id", authenticate, upload.single("image"), editPost);
router.delete("/delete/:id", authenticate, deletePost);

export default router;
