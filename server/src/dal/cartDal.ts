import { Types } from "mongoose";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

const b = productModel.find();

const getCart = async (userId: Types.ObjectId) => {
  return await cartModel.findOne({ user: userId }).populate("items.product_id");
};

export default { getCart };
