import Product from "../Product.js";

export default interface ElectronicsProduct extends Product {
    // Add properties specific to Electronics category
    powerRating: number;
    brand: string;
}