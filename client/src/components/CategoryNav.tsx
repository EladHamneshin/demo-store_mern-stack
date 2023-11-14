import { Card } from '@mui/material';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import categoriesAPI from '../api/categoriesAPI';
import Category from '../types/Category';


export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    categoriesAPI
      .getCategories()
      .then(({ categories }: { categories: Category[] }) =>
        setCategories(categories)
      )
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
      {categories?.map((category) => (
        <Link href={`/category/${category.name}`} underline="none" key={category._id}>
          {category.name}
        </Link>
      ))}
    </Card>
  );
}
