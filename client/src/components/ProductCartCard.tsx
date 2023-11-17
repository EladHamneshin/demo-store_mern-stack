import  { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography,  CardContent, Paper, Grid, } from '@mui/material';
import cartsAPI from '../api/cartsAPI';
import Product from '../types/Product';
import { useAuth } from '../hooks/useAuth';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import { toastError } from '../utils/toastUtils';

type Props = {
    product: Product;
    quantity: number;
    removeFromCart: (productId: string) => Promise<void>;
    totalAmount: number
    setTotalAmount: Dispatch<SetStateAction<number>>
};

const ProductCartCard = ({ product, quantity, removeFromCart , totalAmount, setTotalAmount}: Props) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);
    const { userInfo } = useAuth();

    const increaseQuantity = async (productId: string) => {
        if (cartQuantity < product.quantity) {
            try {
                if (userInfo) {
                    await cartsAPI.updateQuantity(productId, 'inc');
                } else {
                    cartLocalStorageUtils.incQuantityOfProduct(productId);
                }
                setCartQuantity(cartQuantity + 1);
                setTotalAmount(totalAmount + product.price)
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
        <>
        <Paper style={{ boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)', margin: 'auto', marginBottom: '16px', width: '50%', boxSizing: 'border-box' }}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={6} justifyContent="center" alignItems="center">
                    <img src={product.imageUrl} alt={product.name} height={200} />
                </Grid>
                <Grid item xs={6}>
                    <CardContent>
                        <Typography variant="h3">{product?.name}</Typography>
                        <Typography variant="body1">{product?.category}</Typography>
                        <Typography variant="body1">${product?.price}</Typography>
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
                    <div style={{ display: 'flex', margin: '5px', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={() => deleteFromCart(product._id)}>
                            Delete from Cart
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
        </>
    );
};

export default ProductCartCard;
