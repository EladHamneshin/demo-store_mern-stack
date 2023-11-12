import {Types} from "mongoose";

type CartItem = {
  user: Types.ObjectId;
  items: {
    product_id: Types.ObjectId;
    quantity: number;
  }[];
};

export default CartItem;
