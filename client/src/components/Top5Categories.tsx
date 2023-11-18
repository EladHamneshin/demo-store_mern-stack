import { Grid, Paper, Typography, styled } from '@mui/material';
import Category from '../types/Category';
import { useEffect, useState } from 'react';
import categoriesAPI from '../api/categoriesAPI';
import CategoryCard from './CategoryCard';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  margin: 5,
  color: theme.palette.text.secondary,
}));

export default function Top5Categories() {
  const [top5Categories, setTop5Categories] = useState<Category[] >([]);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const categories = await categoriesAPI.getTop5categories();
        setTop5Categories(categories);
      } catch (err) {
        console.error('Error fetching top 5 categories');
      }
    };
    fetchTopCategories();
  }, []);

  return (
    <>
      <Typography display={'flex'} justifyContent={'center'} variant="h4">Top 5 Categories</Typography>
      {top5Categories && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {top5Categories.map((category) => (
            <Grid item xs key={category._id}>
              <Item><CategoryCard category={category}/></Item>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
