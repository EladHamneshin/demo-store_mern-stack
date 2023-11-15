import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Product from '../types/Product';
import categoriesAPI from '../api/categoriesAPI';
import ProductCard from '../components/ProductCard';
import ProductCardsContainer from '../components/ProductCardsContainer';

const CategoryPage = () => {
  const { cname } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  // if location.state is not undefined, then we are in compare mode
  const isCompareMode = useRef(!!location.state)

  useEffect(() => {
    categoriesAPI.getProductsFromCategory(cname!).then((products) => {
      setProducts(products);
    })
      .catch((err) => { console.log(err); })
  }, []);

  return (
    <>
      {isCompareMode && <h1>please choose product to compare </h1>}
      <ProductCardsContainer>
        {products.map((product, index) => {
          return <ProductCard key={"cproduct" + index}
            product={product}
            navigateToOnClick={isCompareMode ? `/compare/${location.state._id}/${product._id}` : undefined} />
        })
        }</ProductCardsContainer>
    </>


  )
}

export default CategoryPage;