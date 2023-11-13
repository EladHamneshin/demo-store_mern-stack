import CategoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

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
        .select('name')
        .exec();
    return topCategories
};

const increaseClickedCount = async (name: string) => {
    return await CategoryModel.findOneAndUpdate(
        { name: name },
        { $inc: { clickCount: 1 } },)
};
export default { getCategories, getCategoryProducts, get5Categories, increaseClickedCount };