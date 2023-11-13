import mongoose from 'mongoose';
import Cart from '../types/Cart.js';

const cartSchema = new mongoose.Schema<Cart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
