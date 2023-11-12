import Product from "../Product.js";

export default interface ClothingProduct extends Product {
    // Add properties specific to Clothing category
    size: string;
    material: string;
  }

