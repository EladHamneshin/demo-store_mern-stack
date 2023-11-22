import Category from "../types/Category";
import Product from "../types/Product";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;

async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${apiUri}/api/category`);
    return await handleApiRes(response);
}

async function getTop5categories():Promise<Category[]> {
    const response = await fetch(`${apiUri}/api/category/top5`);
    return await handleApiRes(response);
}

async function getProductsFromCategory(name: string): Promise<Product[]>{
        const response = await fetch(`${apiUri}/api/category/${name}`);
        return await handleApiRes(response);
}

async function patchCategoryClick(cname: string): Promise<Category> {
    const response = await fetch(`${apiUri}/api/category/${cname}/click`, { method: "PATCH" });
    return await handleApiRes(response);
}

export default { getCategories, getTop5categories, getProductsFromCategory, patchCategoryClick }