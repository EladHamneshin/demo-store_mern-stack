import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Product from '../types/Product';
import categoriesAPI from '../api/categoriesAPI';
import ProductCard from '../components/ProductCard';
import ProductCardsContainer from '../components/ProductCardsContainer';
import { Box, CircularProgress } from '@mui/material';
import Filter from '../components/Filter';

const CategoryPage = () => {
  const { cname } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const location = useLocation();
  // if location.state is not undefined, then we are in compare mode and it stores the product we want to compare to
  const isCompareMode = useRef(!!location.state);

  useEffect(() => {
    categoriesAPI
      .getProductsFromCategory(cname!)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (products.length === 0) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {isCompareMode.current && <h1>please choose a product to compare </h1>}
      <Filter products={products} setProducts={setFilteredProducts} />
      <ProductCardsContainer>
        {filteredProducts.map((product) => {
          if (isCompareMode.current && location.state._id === product._id)
            return null;

          return (
            <ProductCard
              key={product._id}
              product={product}
              navigateToOnClick={
                isCompareMode.current
                  ? `/compare/${location.state._id}/${product._id}`
                  : undefined
              }
            />
          );
        })}
      </ProductCardsContainer>
    </>
  );
};

export default CategoryPage;
