import { Types } from "mongoose";
import ProductModel from "../models/productModel.js";

const getProductByID = async (id: Types.ObjectId) => {
    return await ProductModel.findOne({_id: id})
}

const increaseClickCount = async (id: Types.ObjectId) => {
   return await ProductModel.findOneAndUpdate(
        { _id: id },
        { $inc: { clickCount: 1 } },
        { new: true }
    );
};

const getProductQuantity = async (id:  Types.ObjectId) => {
    return await ProductModel.findOne({_id : id}).select('quantity')
}

const deleteQuantity = async (id: Types.ObjectId, quantityToDelete: number) => {
    return await ProductModel.findByIdAndUpdate({_id: id},{$inc : {quantity: (quantityToDelete * -1)}})
};
const getTop5Products =  async () => {
    const Top5Products = await ProductModel.find({})
        .sort({ clickCount: -1 })
        .limit(5)
        .exec();
    return Top5Products
};

export default {getProductByID, increaseClickCount, getProductQuantity, deleteQuantity, getTop5Products }