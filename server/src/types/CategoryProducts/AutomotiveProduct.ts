import Product from "../Product.js";

interface AutomotiveProduct extends Product {
    make: string;
    model: string;
}

export default AutomotiveProduct;
  