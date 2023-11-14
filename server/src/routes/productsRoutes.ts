import express from "express";
import productcontrollers from "../controllers/productsControllers.js";
import { authHandler } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.get('/top5', productcontrollers.getTop5Products);
productRouter.get('/:pid', productcontrollers.getProductByID);
productRouter.patch('/:pid/click', productcontrollers.increaseClickCount);
productRouter.patch('/:pid/dec',authHandler, productcontrollers.deleteQuantity)

export default productRouter;
