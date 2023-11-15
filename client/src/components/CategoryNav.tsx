import { Card } from '@mui/material';
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
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
    >
      {categories.map((category) => (
        <Link
          href={`/category/${category.name}`}
          underline="none"
          key={category._id}
          onClick={() => handleClick(category)}
        >
          {category.name}
        </Link>
      ))}
    </Card>
  );
}
