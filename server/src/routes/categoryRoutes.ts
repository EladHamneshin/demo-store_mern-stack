import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getCategories)
categoryRouter.get('/top5', categoryController.get5Categories)
categoryRouter.get('/:name', categoryController.getCategoryProducts)


export default categoryRouter