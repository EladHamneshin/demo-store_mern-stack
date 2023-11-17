import CategoryName from "./CategoryName.js"
import Product from "./Product.js"

type Category = {
    name: CategoryName,
    products: Product[],
    clickCount: number,
    imageUrl: string
}

export default Category