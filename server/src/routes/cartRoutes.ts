import express from 'express';
import { authHandler } from '../middlewares/authMiddleware.js';
import cartController from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.use(authHandler);

cartRouter.get('/', cartController.getCart);
cartRouter.post('/', cartController.updateCart);
cartRouter.delete('/', cartController.deleteCart);
cartRouter.delete('/:pid', cartController.deleteCartItem);
cartRouter.patch('/', cartController.patchAmount);

export default cartRouter;
