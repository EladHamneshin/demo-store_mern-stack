import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../types/Product';
import categoriesAPI from '../api/categoriesAPI';
import ProductCard from '../components/ProductCard';
import ProductCardsContainer from '../components/ProductCardsContainer';
import Filter from '../components/Filter';
import Demo from '../components/Filters';

const CategoryPage = () => {
  const { cname } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] =useState<Product[]>([]);

  useEffect(() => {
    categoriesAPI
      .getProductsFromCategory(cname!)
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    
      {/* <Filter products={products} setProducts={setFilteredProducts}/> */}
      <ProductCardsContainer>
        {products.map((product, index) => {
          return <ProductCard key={'cproduct' + index} product={product} />;
        })}
      </ProductCardsContainer>
    </>
  );
};

export default CategoryPage;
