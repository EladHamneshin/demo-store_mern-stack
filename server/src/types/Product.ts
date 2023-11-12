import CategoryName from "./CategoryName.js";

interface Product {
    quantity: number;
    price: number;
    description: string;
    category: CategoryName;
    imgSource: string;
    name: string;
    clickedCount: number;
    atributes?: Object
};

export default Product;