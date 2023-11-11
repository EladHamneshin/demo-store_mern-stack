import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);

export default userRouter;