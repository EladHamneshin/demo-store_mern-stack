import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from '../types/Product';
import categoriesAPI from '../api/categoriesAPI';
import ProductCard from '../components/ProductCard';
import ProductCardsContainer from '../components/ProductCardsContainer';

const CategoryPage = () => {
  const { cname } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    categoriesAPI.getProductsFromCategory(cname!).then((products) => {    
      setProducts(products);
    })
    .catch((err) => { console.log(err); })
  }, []);

  return (
  <ProductCardsContainer>
    {products.map((product, index)=>{
    return <ProductCard key={"cproduct"+index} product={product}/>})
  }</ProductCardsContainer>
  )
}

export default CategoryPage;