import express from "express";
import { authHandler } from "../middlewares/authMiddleware.js";
import cartController from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.use(authHandler);

cartRouter.get("/", cartController.getCart);
cartRouter.put("/", cartController.updateCart);
// cartRouter.delete('/', cartController.deleteCart);
// cartRouter.patch('/', cartController.patchCart);

export default cartRouter;
