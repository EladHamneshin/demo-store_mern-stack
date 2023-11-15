import CartItem from './CartItem.ts';

interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
}

export default Cart;
