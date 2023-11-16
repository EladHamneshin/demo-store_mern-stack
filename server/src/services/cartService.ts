import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../types/errors/RequestError.js';
import { Types } from 'mongoose';
import cartDal from '../dal/cartDal.js';
import CartItem from '../types/CartItem.js';
import Cart from '../types/Cart.js';

const getCart = async (userId: Types.ObjectId) => {
  const cart = await cartDal.getCart(userId);
  if (!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  return cart;
};

const updateAmount = async (userId: Types.ObjectId, item: CartItem) => {
  const cart = await cartDal.getCartProducts(userId);
  if(!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  
  const prodInCart = cart.items.find(prod => prod.product_id.toString() === item.product_id.toString());
  if(!prodInCart){
    cart.items.push(item);
    const newItemInCart = await cartDal.updateCart(userId, cart.items);
    if (!newItemInCart) throw new RequestError('Cart update failed', STATUS_CODES.INTERNAL_SERVER_ERROR);
    return newItemInCart
  }
  
  const updatedCart = await cartDal.updateAmount(userId, item.product_id.toString(), item.quantity);
  if(!updatedCart)
    throw new RequestError('Cart not found', STATUS_CODES.NO_CONTENT);

  return updatedCart;
};

const updateCart = async (userId: Types.ObjectId, item: CartItem) => {
  const dbCart: Cart | null = await cartDal.getCartProducts(userId);
  if (!dbCart)
    throw new RequestError('Cart not found', STATUS_CODES.NO_CONTENT);

  const index = dbCart.items.findIndex(
    (dbItem) => dbItem.product_id.toString() === item.product_id.toString()
  );

  if (index === -1) dbCart.items.push(item);
  else dbCart.items.splice(index, 1, item);

  const cartRes = await cartDal.updateCart(userId, dbCart.items);
  if (!cartRes)
    throw new RequestError(
      'Cart update failed',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  return cartRes;
};

const deleteCart = async (userId: Types.ObjectId) => {
  const cart = await cartDal.deleteCart(userId);
  if (!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  return cart;
};

const deleteCartItem = async (userId: Types.ObjectId, productId: string) => {
  const cart = await cartDal.deleteCartItem(userId, productId);
  if (!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  return cart;
}
const patchAmount = async (
  userId: Types.ObjectId,
  metaDate: { pid: string; action: string }
) => {
  if (metaDate.action === 'inc')
    return await cartDal.incAmount(userId, metaDate.pid);
  return await cartDal.decAmount(userId, metaDate.pid);
};

export default { getCart,updateAmount, updateCart, deleteCart, deleteCartItem, patchAmount };
