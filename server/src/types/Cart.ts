import { Types } from "mongoose";
import CartItem from "./CartItem.js";

interface CartItems  {
  user: Types.ObjectId;
  items: CartItem[];
};

export default CartItems;
