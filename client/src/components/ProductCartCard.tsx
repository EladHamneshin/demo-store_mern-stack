import React, { useState } from 'react';
import { Button, Typography, Card, CardContent, CardActions, CardMedia, Grid } from '@mui/material';
import cartsAPI from '../api/cartsAPI';
import { toast } from 'react-toastify';
import Product from '../types/Product';
import { useAuth } from '../hooks/useAuth';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';

type Props = {
    product: Product;
    quantity: number;
    removeFromCart: (productId: string) => Promise<void>;
};

const ProductCartCard = ({ product, quantity, removeFromCart }: Props) => {
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
            } catch (error) {
                console.error('Error increasing quantity:', error);
            }
        } else {
            toast.error(`There are only ${product.quantity} items available for purchase`);
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
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        } else {
            toast.error('Quantity cannot be less than 1');
        }
    };

    const deleteFromCart = async (productId: string) => {
        await removeFromCart(productId);
    };

    return (
        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: 'auto', marginBottom: '16px', width: '40%', boxSizing: 'border-box' }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="100%"
                        width="100%"
                        style={{ objectFit: 'cover' }}
                        image={product.imgSource}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardContent>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="body1">{product.category}</Typography>
                        <Typography variant="body1">{product.price}</Typography>
                        <div style={{ display: 'flex', alignItems: 'center' ,justifyContent: "space-evenly"}}>
                            <Button variant="outlined" onClick={() => decreaseQuantity(product._id)}>
                                -
                            </Button>
                            <Typography variant="body1">{cartQuantity}</Typography>
                            <Button variant="outlined" onClick={() => increaseQuantity(product._id)}>
                                +
                            </Button>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={() => deleteFromCart(product._id)}>
                            Delete from Cart
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductCartCard;
