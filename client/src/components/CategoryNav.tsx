import { Paper, Typography, Link, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesAPI
      .getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        flexWrap: 'wrap',
        marginBottom: 2,
        top: 0,
        zIndex: 100,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? '#333'
            : theme.palette.background.default,
      }}
    >
      {categories.map((category) => (
        <Link
          href={`/category/${category.name}`}
          underline="none"
          key={category._id}
          onClick={() => handleClick(category)}
          sx={{
            margin: 0.5,
            padding: 1,
            borderRadius: theme.shape.borderRadius,
            //backgroundColor: theme.palette.mode === 'dark' ? '#444' : theme.palette.background.paper,
            color: theme.palette.getContrastText(
              theme.palette.mode === 'dark'
                ? '#444'
                : theme.palette.background.paper
            ),
            '&:hover': {
              transform: 'scale(1.08)',
              fontWeight: 'bold',
            },
          }}
        >
          <Typography variant="body1">{category.name}</Typography>
        </Link>
      ))}
    </Paper>
  );
}
