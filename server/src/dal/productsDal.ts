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
    return await productModel.findOne({_id : id}).select('quantity')
}

const deleteQuantity = async (id: Types.ObjectId, quantityToDelete: number) => {
    return await productModel.findByIdAndUpdate({_id: id},{$inc : {quantity: (quantityToDelete * -1)}})
};
const getTop5Products =  async () => {
    const Top5Products = await productModel.find({})
        .sort({ clickCount: -1 })
        .limit(5)
        .exec();
    return Top5Products
};

export default {getProductByID, increaseClickedCount, getProductQuantity, deleteQuantity, getTop5Products }