import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import Product from '../types/Product';
import productsAPI from '../api/productsAPI';

type props = {
  product: Product;
  navigateToOnClick?: To;
};

export default function ProductCard({ product, navigateToOnClick }: props) {
  const navigate = useNavigate();
  const handleCLick = async () => {
    try {
      navigate(navigateToOnClick || `/product/${product._id}`);
      await productsAPI.patchProductClick(product._id);
    } catch (err) {
      console.error((err as Error).message);
    }
  };
  return (
    <Card sx={{ maxWidth: 345, margin: '5px' , boxSizing:'border-box',boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)',marginBlock:'10px'}}>
      <CardActionArea onClick={handleCLick} >
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            price: {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
