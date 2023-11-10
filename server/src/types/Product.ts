import Category from "./Category.js";

type Product = {
    quantity: number;
    price: number;
    description: string;
    category: Category;
    imgSource: string;
    name: string;
    clickedCount: number;
};

export default Product;