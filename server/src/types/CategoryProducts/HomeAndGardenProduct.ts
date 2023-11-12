import Product from "../Product.js";

export default interface HomeAndGardenProduct extends Product {
    // Add properties specific to Home and Garden category
    dimensions: string;
    material: string;
  }