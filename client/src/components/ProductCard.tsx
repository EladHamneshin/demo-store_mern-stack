import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Product from '../types/Product';
import productsAPI from '../api/productsAPI';

type props = {
  product: Product;
};

export default function ProductCard({ product }: props) {
  const navigate = useNavigate();
  const handleCLick = async () => {
    try {
      navigate(`/product/${product._id}`);
      await productsAPI.patchProductClick(product._id);
    } catch (err) {
      console.error((err as Error).message);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCLick}>
        <CardMedia
          component="img"
          height="140"
          image={product.imgSource}
          alt="green iguana"
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
