import Product from "../Product.js";

  
export default interface ToysAndGamesProduct extends Product {
// Add properties specific to Toys and Games category
ageRange: string;
manufacturer: string;
}
