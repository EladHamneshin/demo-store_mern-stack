import mongoose from 'mongoose';
import Category from '../types/Category.js';


const categorySchema = new mongoose.Schema<Category>(
  {
    name: String ,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }],
    clickCount: Number
  },
  {
    timestamps: true,
  }
);


const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;
