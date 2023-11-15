import asyncHandler from 'express-async-handler';
import categoryService from '../services/categoryService.js';

// @desc    Get all categories
// @route   GET /api/category
// @access  Public
const getCategories = asyncHandler(async (_req, res) => {
  const categories = await categoryService.getCategories();
  res.json(categories);
});

// @desc    Get products from category
// @route   GET /api/category/:name
// @access  Public
const getCategoryProducts = asyncHandler(async (req, res) => {
  const products = await categoryService.getCategoryProducts(req);
  res.json(products);
});

// @desc    Get top 5 categories
// @route   GET /api/category/top5
// @access  Public
const get5Categories = asyncHandler(async (_req, res) => {
  const categories = await categoryService.getTop5Categories();
  res.json(categories);
});

// @desc    Increase clicked count
// @route   PATCH /api/category/:name/click
// @access  Public
const increaseClickedCount = asyncHandler(async (req, res) => {
  const category = await categoryService.increaseClickCount(req);
  res.json(category);
});

export default {
  getCategories,
  getCategoryProducts,
  get5Categories,
  increaseClickedCount,
};
