async function getTop5Products() {
    const response = await fetch("/api/products/top5");
    const top5Products = await response.json();
    console.log(top5Products);

    return top5Products
}

async function getProduct(pid: string) {
    const response = await fetch(`/api/products/${pid}`);
    const product = await response.json();
    return product
}

async function patchProductClick(pid: string) {
    const response = await fetch(`/api/products/${pid}/click`, { method: "PATCH" });
    const product = await response.text();
    return product
}

async function checkingAndUpdatingAProduct(pid: string, quantity: string) {
    const response = await fetch(`/api/products/${pid}/dec`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantityToDelete: quantity }),
      });
  
      const product = await response.text();
      console.log(product);
      
      return product;
}


export default { getTop5Products, getProduct, patchProductClick, checkingAndUpdatingAProduct }