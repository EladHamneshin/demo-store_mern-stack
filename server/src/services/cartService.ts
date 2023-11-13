import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import { Types } from "mongoose";
import cartDal from "../dal/cartDal.js";
import CartItem from "../types/CartItem.js";
import CartItems from "../types/Cart.js";

const getCart = async (userId: Types.ObjectId) => {
  const cart = await cartDal.getCart(userId);
  if (!cart) return null;
  return cart;
};

const updateCart = async (userId: Types.ObjectId, item: CartItem) => {
  const dbCart: CartItems | null = await cartDal.getCartProducts(userId);
  if (!dbCart)
    throw new RequestError("Cart not found", STATUS_CODES.BAD_REQUEST);

  const index = dbCart.items.findIndex(
    (dbItem) => dbItem.product_id.toString() === item.product_id.toString()
  );

  if (index === -1) dbCart.items.push(item);
  else dbCart.items.splice(index, 1, item);

  const cartRes = await cartDal.updateCart(userId, dbCart.items);
  if (!cartRes)
    throw new RequestError(
      "Cart update failed",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  return cartRes;
};
export default { getCart, updateCart };
