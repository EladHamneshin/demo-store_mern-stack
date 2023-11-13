import { Types } from 'mongoose';
import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import CartItems from '../types/Cart.js';

const b = productModel.find();

const createCart = async (userId: Types.ObjectId) => {
  return await cartModel.create({ user: userId });
};

const getCart = async (userId: Types.ObjectId) => {
  return await cartModel.findOne({ user: userId }).populate('items.product_id');
};

const getCartProducts = async (userId: Types.ObjectId) => {
  return await cartModel.findOne({ user: userId });
};

const updateCart = async (
  userId: Types.ObjectId,
  items: CartItems['items']
) => {
  return await cartModel.findOneAndUpdate(
    { user: userId },
    { items: items },
    { new: true }
  );
};

const deleteCart = async (userId: Types.ObjectId) => {
  return await cartModel.findOneAndUpdate(
    { user: userId },
    { items: [] },
    { new: true }
  );
};
export default { createCart, getCart, getCartProducts, updateCart, deleteCart };
