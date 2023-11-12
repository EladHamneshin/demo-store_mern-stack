import Product from "../Product.js";

export default interface FurnitureProduct extends Product {
    // Add properties specific to Furniture category
    material: string;
    style: string;
  }