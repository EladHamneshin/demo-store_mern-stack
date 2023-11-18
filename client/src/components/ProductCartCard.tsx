import { Button, Typography, CardContent, Paper, Grid, Box } from '@mui/material';
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
        <Paper style={{ margin: '16px', padding: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <img src={product.imageUrl} alt={product.name} style={{ height: '100' }} />
                </Grid>
                <Grid item xs={8}>
                    <CardContent>
                        <Typography variant="h3" style={{ fontSize: '1.5rem' }}>
                            {product?.name}
                        </Typography>
                        <Typography variant="body1">
                            <Box display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="bold">
                                    price for one:
                                </Typography>
                                <Typography variant="body1">${product?.price}</Typography>
                            </Box>
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Button variant="outlined" onClick={() => decreaseQuantity(product._id)}>
                                -
                            </Button>
                            <Typography variant="body1">{cartQuantity}</Typography>
                            <Button variant="outlined" onClick={() => increaseQuantity(product._id)}>
                                +
                            </Button>
                        </div>
                    </CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <Button variant="outlined" onClick={() => deleteFromCart(product._id)}>
                            <DeleteForeverIcon />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductCartCard;
