import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Category from '../types/Category';
import { useNavigate } from 'react-router-dom';

type props = {
  category: Category;
};
export default function CategoryCard({ category }: props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/category/${category.name}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="140" image="" alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
