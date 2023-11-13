import { ObjectId, Types } from "mongoose";
import Product from "../types/Product.js";
import productModel from "../models/productModel.js";

const getProductByID = async (id: Types.ObjectId) => {
    return await productModel.findOne({_id: id})
}

const increaseClickedCount = async (id: Types.ObjectId) => {
   return await productModel.findOneAndUpdate(
        { _id: id },
        { $inc: { clickedCount: 1 } },
        { new: true }
    );
};

const getProductQuantity = async (id:  Types.ObjectId) => {
    return await productModel.findOne({_id : id}).select('quantity') as unknown as number
}

const deleteQuantity = async (id: Types.ObjectId, quantityToDelete: number) => {
    return await productModel.findByIdAndUpdate({_id: id},{$inc : {quantity: (quantityToDelete * -1)}})
};


export default {getProductByID, increaseClickedCount, getProductQuantity, deleteQuantity}