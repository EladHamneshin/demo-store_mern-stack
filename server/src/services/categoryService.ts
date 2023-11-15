import categoryDal from "../dal/categoryDal.js";
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { Request } from "express";

const getCategories = async () => {
    const categorys = await categoryDal.getCategories();
    if (!categorys)
        throw new RequestError('Categorys not found', STATUS_CODES.NOT_FOUND);
    return categorys;
}

const getCategoryProducts = async (req: Request) => {
    const { name } = req.params;
    const category = await categoryDal.getCategoryProducts(name);
    if (!category)
        throw new RequestError('Category not found', STATUS_CODES.NOT_FOUND);
    return category.products;

}
const getTop5Categories = async () => {
    const category = await categoryDal.getTop5Categories();
    if (!category)
        throw new RequestError('Category not found', STATUS_CODES.NOT_FOUND);
    return category;
}

const increaseClickCount = async (req: Request) => {
    const { cname } = req.params;
    const category = await categoryDal.increaseClickCount(cname);
    if (!category)
        throw new RequestError('Category not found', STATUS_CODES.NOT_FOUND);
    return category;
}
export default { getCategories, getCategoryProducts, getTop5Categories, increaseClickCount }