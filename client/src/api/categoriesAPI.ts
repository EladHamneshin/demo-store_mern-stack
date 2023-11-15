import Product from "../types/Product";
import handleApiRes from "./apiResHandler";

async function getCategories() {
    const response = await fetch("/api/category");
    return await handleApiRes(response);
}
async function getTop5categories() {
    const response = await fetch("/api/category/top5");
    return await handleApiRes(response);
}

async function getProductsFromCategory(name: string): Promise<Product[]>{
        const response = await fetch(`/api/category/${name}`);
        return await handleApiRes(response);
}
    


export default { getCategories, getTop5categories, getProductsFromCategory }