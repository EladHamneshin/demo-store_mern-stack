import productsService from "../services/productsService.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import mongoose from "mongoose";


const getProductByID = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const product = await productsService.getProductByID(productId)

    res.json(product)  
})

const increaseClickedCount = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);
    const increased = await productsService.increaseClickedCount(productId)

    res.sendStatus(STATUS_CODES.OK)
})

const deleteQuantity = asyncHandler(async (req: Request, res: Response) => {
    const {pid} = req.params
    const productId = new mongoose.Types.ObjectId(pid);

    const {quantityToDelete} = req.body

    const deleted = await productsService.deleteQuantity(productId, +quantityToDelete)
    res.sendStatus(STATUS_CODES.OK)
})

export default {increaseClickedCount, getProductByID, deleteQuantity}