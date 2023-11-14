import asyncHandler from "express-async-handler";
import categoryService from '../services/categoryService.js';
import STATUS_CODES from "../utils/StatusCodes.js";

const getCategories = asyncHandler(async (_req, res) => {  
    const categories = await categoryService.getCategories();
    res.json({
       categories
    });
  });

const getCategoryProducts = asyncHandler(async (req, res) => {
    const products = await categoryService.getCategoryProducts(req);
    res.json(products);
    
});

const get5Categories = asyncHandler(async (_req, res) => {
    const categories = await categoryService.getTop5Categories();
    res.json(categories)

});

const increaseClickedCount = asyncHandler(async (req, res) => {
    const category = await categoryService.increaseClickCount(req);
    res.sendStatus(STATUS_CODES.OK)
});
export default {getCategories, getCategoryProducts,  get5Categories, increaseClickedCount };

