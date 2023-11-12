import userDal from "../dal/userDal.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import { Types } from "mongoose";
import cartDal from "../dal/cartDal.js";

const getCart = async (userId: Types.ObjectId) => {
	const cart = await cartDal.getCart(userId);
	// if(!cart)
	// 	return null;
    console.log(cart);
    
	return cart;
}

export default { getCart };