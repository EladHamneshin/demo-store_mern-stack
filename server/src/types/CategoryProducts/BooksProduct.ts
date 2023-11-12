import Product from "../Product.js";

interface BooksProduct extends Product {
    // Add properties specific to Books category
    author: string;
    genre: string;
  }

  export default BooksProduct