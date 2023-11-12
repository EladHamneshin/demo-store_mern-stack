import Product from "../Product.js";

export default interface SportsAndOutdoorsProduct extends Product {
    // Add properties specific to Sports and Outdoors category
    sport: string;
    equipmentType: string;
  }