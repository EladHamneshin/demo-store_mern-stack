import Product from "../types/Product";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;

async function getTop5Products(): Promise<Product[]> {
    const response = await fetch(`${apiUri}/api/products/top5`);
    return await handleApiRes(response);
}

async function getProduct(pid: string): Promise<Product> {
    const response = await fetch(`${apiUri}/api/products/${pid}`);
    return await handleApiRes(response);
}

async function patchProductClick(pid: string): Promise<Product>  {
    const response = await fetch(`${apiUri}/api/products/${pid}/click`, { method: "PATCH" });
    return await handleApiRes(response);
}

async function checkingAndUpdatingProduct(pid: string, quantity: string): Promise<Product>  {
    const response = await fetch(`${apiUri}/api/products/${pid}/dec`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantityToDelete: quantity }),
      });
  
      return await handleApiRes(response);
}


export default { getTop5Products, getProduct, patchProductClick, checkingAndUpdatingProduct }