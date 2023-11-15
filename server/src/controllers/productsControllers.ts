import productsService from "../services/productsService.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import mongoose from "mongoose";


const getProductByID = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const product = await productsService.getProductByID(productId)

    res.json(product)  
})

const increaseClickCount = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const increased = await productsService.increaseClickCount(productId)
    res.json(increased)
})

const deleteQuantity = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const {quantityToDelete} = req.body
    const deleted = await productsService.deleteQuantity(productId, +quantityToDelete)
    res.json(deleted)
})
const getTop5Products = asyncHandler(async (req, res) => {  
    const Top5Products = await productsService.getTop5Products();
    res.json({
        Top5Products
    });
  });

export default {increaseClickCount, getProductByID, deleteQuantity, getTop5Products}