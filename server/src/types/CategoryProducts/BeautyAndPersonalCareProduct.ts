import Product from "../Product.js";

interface BeautyAndPersonalCareProduct extends Product {
    skinType: string;
    ingredients: string[];
  }

export default BeautyAndPersonalCareProduct