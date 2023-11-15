import productsService from "../services/productsService.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import mongoose from "mongoose";

// @desc    Get product by id
// @route   GET  /api/products/:pid
// @access  Public
const getProductByID = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const product = await productsService.getProductByID(productId)

    res.json(product)  
})

// @desc    Increase clicked count
// @route   PATCH /api/products/:pid/click
// @access  Public
const increaseClickCount = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const increased = await productsService.increaseClickCount(productId)
    res.json(increased)
})

// @desc    Decrease quantity
// @route   PARCH /api/products/:pid/dec
// @access  Public
const deleteQuantity = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const {quantityToDelete} = req.body
    const deleted = await productsService.deleteQuantity(productId, +quantityToDelete)
    res.json(deleted)
})

// @desc    Get top 5 products
// @route   GET /api/products/top5
// @access  Public
const getTop5Products = asyncHandler(async (_req, res) => {  
    const top5Products = await productsService.getTop5Products();
    res.json(top5Products);
  });

export default {increaseClickCount, getProductByID, deleteQuantity, getTop5Products}