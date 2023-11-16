import { Card, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import categoriesAPI from '../api/categoriesAPI';
import Category from '../types/Category';

const handleClick = async (category: Category) => {
  try {
    await categoriesAPI.patchCategoryClick(category.name);
  } catch (err) {
    console.error((err as Error).message);
  }
};

export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesAPI
      .getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {categories.map((category) => (
        <Link
          href={`/category/${category.name}`}
          underline="none"
          key={category._id}
          onClick={() => handleClick(category)}
          sx={{
            padding: 1,
            margin: 1,
            borderRadius: 5,
            backgroundColor: '#f0f0f0',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          <Typography variant="body1">{category.name}</Typography>
        </Link>
      ))}
    </Card>
  );
}
