import { Types } from "mongoose";

interface CartItem {
  product_id: Types.ObjectId;
  quantity: number;
}

export default CartItem;
