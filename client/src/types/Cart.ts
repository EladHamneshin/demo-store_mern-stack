import CartItem from './CartItem.ts';

interface Cart {
    cartId: string;
    items: CartItem[];
}

export default Cart;
