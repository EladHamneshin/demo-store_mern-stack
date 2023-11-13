import { Types } from 'mongoose';
import CartItem from './CartItem.js';

interface Cart {
  user: Types.ObjectId;
  items: CartItem[];
}

export default Cart;
