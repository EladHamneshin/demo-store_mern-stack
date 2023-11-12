import mongoose from "mongoose";
import CartItem from "../types/CartItem.js";

const cartSchema = new mongoose.Schema<CartItem>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel