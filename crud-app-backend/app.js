import express from "express";
import userRoutes from "./src/routes/user.route.js";
import PostRoutes from "./src/routes/post.route.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-app-seven-weld-92.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/post", PostRoutes);

app.use(errorMiddleware);
export default app;
