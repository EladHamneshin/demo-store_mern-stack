import mongoose from "mongoose";
import AutomotiveProduct from "../types/CategoryProducts/AutomotiveProduct.js";
import BeautyAndPersonalCareProduct from "../types/CategoryProducts/BeautyAndPersonalCareProduct.js";
import BooksProduct from "../types/CategoryProducts/BooksProduct.js";
import ClothingProduct from "../types/CategoryProducts/ClothingProduct.js";
import ElectronicsProduct from "../types/CategoryProducts/ElectronicsProduct.js";
import FoodAndBeveragesProduct from "../types/CategoryProducts/FoodAndBeveragesProduct.js";
import FurnitureProduct from "../types/CategoryProducts/FurnitureProduct.js";
import HomeAndGardenProduct from "../types/CategoryProducts/HomeAndGardenProduct.js";
import SportsAndOutdoorsProduct from "../types/CategoryProducts/SportsAndOutdoorsProduct.js";
import ToysAndGamesProduct from "../types/CategoryProducts/ToysAndGamesProduct.js";
type ProductTypes = AutomotiveProduct | BeautyAndPersonalCareProduct | BooksProduct | ClothingProduct | ElectronicsProduct | FoodAndBeveragesProduct | FurnitureProduct | HomeAndGardenProduct | SportsAndOutdoorsProduct | ToysAndGamesProduct
const productSchema = new mongoose.Schema<ProductTypes>(
    {
        quantity: Number,
        price: Number,
        description: String,
        imgSource: String,
        name: String,
        clickedCount: Number
    },
    {
        timestamps: true,
         strict : false
    }
)
const productModel = mongoose.model('product', productSchema);
export default productModel;