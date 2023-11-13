async function getCategories() {
    const response = await fetch("/api/category");
    const categories = await response.json();
    return categories
}
async function getTop5categories() {
    const response = await fetch("/api/category/top5");
    const top5categories = await response.json();
    return top5categories
}

async function getProductsFromCategory(name: string) {
        const response = await fetch(`/api/category/${name}`);
        const top5categories = await response.json();
        return top5categories;
}
    


export default { getCategories, getTop5categories, getProductsFromCategory }