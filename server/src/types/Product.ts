import CategoryName from "./CategoryName.js";

interface Product {
    quantity: number;
    price: number;
    description: string;
    category: CategoryName;
    imageUrl: string;
    name: string;
    clickCount: number;
};

export default Product;