import CategoryName from "./CategoryName.js";

interface Product {
    productId: string;
    quantity: number;
    price: number;
    description: string;
    category: CategoryName;
    imgSource: string;
    name: string;
    clickCount: number;
};

export default Product;