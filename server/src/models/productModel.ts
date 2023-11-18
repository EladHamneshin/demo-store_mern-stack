import mongoose from "mongoose";
import Product from "../types/Product.js";

const productSchema = new mongoose.Schema<Product>(
    {
        quantity: Number,
        price: Number,
        description: String,
        imageUrl: String,
        name: String,
        clickCount: Number
    },
    {
        timestamps: true,
        strict : false
    }
)
const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;