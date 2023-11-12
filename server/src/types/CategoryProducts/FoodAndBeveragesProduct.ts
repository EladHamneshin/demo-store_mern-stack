import Product from "../Product.js";

export default interface FoodAndBeveragesProduct extends Product {
    // Add properties specific to Food and Beverages category
    expirationDate: string;
    ingredients: string[];
  }