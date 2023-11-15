import handleApiRes from "./apiResHandler";

async function getTop5Products() {
    const response = await fetch("/api/products/top5");
    return await handleApiRes(response);
}

async function getProduct(pid: string) {
    const response = await fetch(`/api/products/${pid}`);
    return await handleApiRes(response);
}

async function patchProductClick(pid: string) {
    const response = await fetch(`/api/products/${pid}/click`, { method: "PATCH" });
    //TODO change to handleApiRes
    const product = await response.text();
    return product
}

async function checkingAndUpdatingProduct(pid: string, quantity: string) {
    const response = await fetch(`/api/products/${pid}/dec`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantityToDelete: quantity }),
      });
  
      //TODO change to handleApiRes
      const product = await response.text();
      console.log(product);
      
      return product;
}


export default { getTop5Products, getProduct, patchProductClick, checkingAndUpdatingProduct }