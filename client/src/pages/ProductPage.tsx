import { useState, useEffect } from "react";
import { Grid, Typography, Card, CardContent, Button, IconButton, Box } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import Product from "../types/Product.ts";
import StoreMap from "../components/StoreMap.tsx";
const ProductPage = () => {
  const [product, setProduct] = useState<null | Product>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { pid } = useParams();
  const getProduct =async (pid:string) => {
      const product = await productsAPI.getProduct(pid!);
      setProduct(product);
  }
  
  useEffect(() => {
    getProduct(pid!)
  }, []);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };
  const handleAddToCart = () => {
    // Add the product to the cart here.
  };
  const handleCompareProducts = () => {
    // To handle the product comparing
  }
  if (!product) {
    return <div>Loading product...</div>
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card>
          <CardContent >
            <img src={product?.imgSource} alt={product?.name} height={200} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} >
        <Card>
          <CardContent>
            <Typography variant="h3">{product?.name}</Typography>
            <Typography variant="body1">{product?.description}</Typography>
            <Typography variant="h6">${product?.price}</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton><RemoveCircleRoundedIcon onClick={decrementQuantity}></RemoveCircleRoundedIcon></IconButton>
              <Box>{quantity}</Box>
              <IconButton><AddCircleRoundedIcon onClick={() => setQuantity(quantity + 1)}></AddCircleRoundedIcon></IconButton>
            </div>
            <div style={{margin:"5px",alignItems:'space-around'}}>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="contained" color="primary" onClick={handleCompareProducts}>
              Compare similar products
            </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <StoreMap />
      </Grid>
    </Grid>
  );
};
export default ProductPage;