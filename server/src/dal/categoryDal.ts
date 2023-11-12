import CategoryModel from "../models/CategoryModel.js";
import productModel from "../models/productModel.js";
import Category from "../types/Category.js";

const getCategories = async () => {
    const categories = await CategoryModel.find({}).select('name');
    return categories
};

const getCategoryProducts = async (name: string) => {
    const a = await productModel.find();
    const category = await CategoryModel.findOne({ name }).populate('products').exec();
    return category
};

const get5Categories = async () => {
    const topCategories = await CategoryModel.find({})
            .sort({ clickCount: -1 }) 
            .limit(5) 
            .exec();
        return topCategories;
};

export default { getCategories, getCategoryProducts, get5Categories };