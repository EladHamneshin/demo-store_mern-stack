import express from "express";
import userController from "../controllers/userController.js";
import authRoutes from "./authRoutes.js";
import { authHandler } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.use("/auth", authRoutes);

userRouter.get("/", authHandler, userController.getUser);
userRouter.post("/register", userController.registerUser);

export default userRouter;
