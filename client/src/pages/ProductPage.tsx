import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, IconButton, Box, Paper, CircularProgress } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import Product from "../types/Product.ts";
import StoreMap from "../components/StoreMap.tsx";
import cartsAPI from "../api/cartsAPI.ts";
import * as localstorage from "../utils/cartLocalStorageUtils.ts";
import CartItem from "../types/CartItem.ts";
import { toastError, toastSuccess } from "../utils/toastUtils.ts";
import { UserContext } from "../UserContext.tsx";



const ProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<null | Product>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const context = useContext(UserContext)!;
    const { userInfo, setProductsInCart} = context
    const { pid } = useParams();

    //handle get product by id from server
    const getProduct = async (pid: string) => {
        try {
            const product = await productsAPI.getProduct(pid!);
            setProduct(product);
        } catch (error) {
            console.error('Failed to fetch');
        };
    };

    //get the product after the page is rendered
    useEffect(() => {
        getProduct(pid!);
    }, []);

    //handle decrease quantity by clicking on the minus button (when quantity shouldnt be lower then 1)
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQty => prevQty - 1);
        };
    };

    //handle add to cart. (if user logged in, products is being added to db at the server, else its stored in localstorage)
    const handleAddToCart = async () => {
        if (quantity > product!.quantity) {
            toastError(`Only ${product!.quantity} in stock`);
            return;
        };
        if (userInfo) {
            try {
                const cart = await cartsAPI.addToCart(product!._id, quantity.toString());
                toastSuccess('Added to cart!');
                setQuantity(1);
                setProductsInCart(cart.items.length);
            } catch (error) {
                console.error('failed to add to cart');
                toastError('Failed to add');
            };
        } else {
            const itemForCart: CartItem = { product_id: product!, quantity: quantity };
            localstorage.addToCart(itemForCart);
            setProductsInCart(localstorage.getCart().length);
            toastSuccess('Added to cart!');
            setQuantity(1);
        };
    };

    //Navigate the user to choose another product to compare them
    const handleCompareProducts = () => {
        navigate(`/category/${product!.category}`, { state: product });
    };

    //If the the product isn't loaded yet, show "Loading product..."
    if (!product) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>;
    }


  //When the product is loaded then show the component
  return (
    <>
      <Paper style={{ margin: 50 }}>
        <Grid container spacing={3} alignItems='center' justifyContent='center'>
          <Grid item xs={6} justifyContent='center' alignItems='center'>
            <img src={product?.imageUrl} alt={product?.name} height={200} />
          </Grid>
          <Grid item xs={6} >
            <Typography variant="h3">{product?.name}</Typography>
            <Typography variant="body1">{product?.description}</Typography>
            <Typography variant="h6">${product?.price}</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={decrementQuantity}><RemoveCircleRoundedIcon ></RemoveCircleRoundedIcon></IconButton>
              <Box>{quantity}</Box>
              <IconButton onClick={() => setQuantity(quantity + 1)}><AddCircleRoundedIcon ></AddCircleRoundedIcon></IconButton>
            </div>
            <div style={{ margin: "5px", alignItems: 'space-around' }}>
              <Button style={{ margin: 5 }} variant="contained" color="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button style={{ margin: 5 }} variant="contained" color="primary" onClick={handleCompareProducts}>
                Compare similar products
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{margin: '10px 50px',height:500}}>
        <StoreMap />
      </Paper>
    </>
  );
};
export default ProductPage;