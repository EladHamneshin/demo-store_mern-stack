import CategoryName from './CategoryName.js';
import { Phone, Computer, Ring, Book, Bag, Watch, Guitar } from './CategoryTags.js';

interface Product {
  _id: string;
  quantity: number;
  price: number;
  description: string;
  category: CategoryName;
  imgSource: string;
  name: string;
  clickCount: number;
  tags: Phone | Computer | Ring | Book | Bag | Watch | Guitar;
}
export default Product;
