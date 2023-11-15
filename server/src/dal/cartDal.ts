import { Types } from 'mongoose';
import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import Cart from '../types/Cart.js';

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

const updateCart = async (userId: Types.ObjectId, items: Cart['items']) => {
  return await cartModel.findOneAndUpdate(
    { user: userId },
    { items: items },
    { new: true }
  );
};

const updateAmount = async (userId: Types.ObjectId, product_id: string, amount: number) => {
  return await cartModel.findOneAndUpdate(
    { user: userId, 'items.product_id': product_id },
    { $inc: { 'items.$.quantity': amount } },
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

const deleteCartItem = async (userId: Types.ObjectId, productId: string) => {
  return await cartModel.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product_id: productId } } },
    { new: true }
  );
};

const incAmount = async (userId: Types.ObjectId, product_id: string) => {
  return await cartModel.findOneAndUpdate(
    { user: userId, 'items.product_id': product_id },
    { $inc: { 'items.$.quantity': 1 } },
    { new: true }
  );
};

const decAmount = async (userId: Types.ObjectId, product_id: string) => {
  return await cartModel.findOneAndUpdate(
    { user: userId, 'items.product_id': product_id },
    { $inc: { 'items.$.quantity': -1 } },
    { new: true }
  );
};

export default {
  createCart,
  getCart,
  getCartProducts,
  updateCart,
  deleteCart,
  updateAmount,
  deleteCartItem,
  incAmount,
  decAmount,
};
