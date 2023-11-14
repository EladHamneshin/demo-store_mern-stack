import Product from "./Product.js";

interface CartItem {
  product_id: Product;
  quantity: number;
}

export default CartItem;
