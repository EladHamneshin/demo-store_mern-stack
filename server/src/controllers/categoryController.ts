import asyncHandler from "express-async-handler";
import categoryService from '../services/categoryService.js';

const getCategories = asyncHandler(async (req, res) => {  
    const categorys = await categoryService.getCategories();
    res.json({
      categorys
    });
  });

const getCategoryProducts = asyncHandler(async (req, res) => {
    const products = await categoryService.getCategoryProducts(req);
    res.json(products);
    
});

const get5Categories = asyncHandler(async (req, res) => {
    const categories = await categoryService.get5Categories();
    res.json(categories)

});
export default {getCategories, getCategoryProducts,  get5Categories };

