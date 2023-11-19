import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import Product from '../types/Product';
import ProductCard from './ProductCard';
import { Grid, Typography } from '@mui/material';

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
      <Typography
        marginTop={5}
        display={'flex'}
        justifyContent={'center'}
        variant="h4"
      >
        Top 5 Products
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {top5Products.map((product) => (
          <Grid item xs key={product._id}>
            <ProductCard key={product._id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Top5ProductsPage;
