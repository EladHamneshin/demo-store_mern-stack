import { Typography, CardContent, Box, IconButton, Card } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import cartsAPI from '../api/cartsAPI';
import Product from '../types/Product';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import { toastError } from '../utils/toastUtils';
import { UserContext } from '../UserContext';

type Props = {
    product: Product;
    quantity: number;
    removeFromCart: (productId: string) => Promise<void>;
    totalAmount: number;
    setTotalAmount: Dispatch<SetStateAction<number>>;
    updateCartItemQuantity: (productId: string, newQuantity: number) => void; // Add prop for updating quantity
};

const ProductCartCard = ({ product, quantity, removeFromCart, totalAmount, setTotalAmount, updateCartItemQuantity }: Props) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);
    const context = useContext(UserContext)!;
    const { userInfo} = context

    const increaseQuantity = async (productId: string) => {
        if (cartQuantity < product.quantity) {
            try {
                if (userInfo) {
                    await cartsAPI.updateQuantity(productId, 'inc');
                } else {
                    cartLocalStorageUtils.incQuantityOfProduct(productId);
                }
                setCartQuantity(cartQuantity + 1);
                setTotalAmount(totalAmount + product.price);

                updateCartItemQuantity(productId, cartQuantity + 1);
            } catch (error) {
                console.error('Error increasing quantity:', error);
            }
        } else {
            toastError(`There are only ${product.quantity} items available for purchase`);
        }
    };

    const decreaseQuantity = async (productId: string) => {
        if (cartQuantity > 1) {
            try {
                if (userInfo) {
                    await cartsAPI.updateQuantity(productId, 'dec');
                } else {
                    cartLocalStorageUtils.decQuantityOfProduct(productId);
                }
                setCartQuantity(cartQuantity - 1);
                setTotalAmount(totalAmount - product.price);

                updateCartItemQuantity(productId, cartQuantity - 1);
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        } else {
            toastError('Quantity cannot be less than 1');
        }
    };

    const deleteFromCart = async (productId: string) => {
        await removeFromCart(productId);
    };

    return (
        <Card sx={{margin:2, padding:1}}>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Box>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
          </Box>
  
          <Box flexGrow={1}>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="body2">{`Price: ${product.price}`}</Typography>
            </CardContent>
          </Box>
  
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <IconButton onClick={() => increaseQuantity(product._id)}>+</IconButton>
            <Typography variant="body1">{cartQuantity}</Typography>
            <IconButton onClick={() => decreaseQuantity(product._id)}>-</IconButton>
          </Box>
  
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <IconButton onClick={() => deleteFromCart(product._id)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
};

export default ProductCartCard;
