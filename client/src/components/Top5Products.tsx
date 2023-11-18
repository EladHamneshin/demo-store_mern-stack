import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import Product from '../types/Product';
import ProductCard from './ProductCard';
import { Typography } from '@mui/material';
import ProductCardsContainer from './ProductCardsContainer';

function Top5ProductsPage() {
    const [top5Products, setTop5Products] = useState<Product[]>([]);

    useEffect(() => {
        const fetchTop5Products = async () => {
            try {
                const top5Products = await productsAPI.getTop5Products();
                setTop5Products(top5Products);
            } catch (error) {
                console.error('Error fetching top 5 products:', error);
            }
        };

        fetchTop5Products();
    }, []);

    return (
        <>
            <Typography display={'flex'} justifyContent={'center'} variant="h4">Top 5 Products</Typography>
       
        <ProductCardsContainer
          
        >
          {top5Products.map((product) => (
              <ProductCard key={product._id} product={product} />
          ))}
        </ProductCardsContainer>
      
 
        </>
    );
}

export default Top5ProductsPage;
