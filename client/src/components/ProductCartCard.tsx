import React, { useState } from 'react';
import { styled, Button, Typography, Card, CardContent } from '@mui/material';
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
            if (userInfo) {
                try {
                    await cartsAPI.updateQuantity(productId, 'inc');
                    setCartQuantity(cartQuantity + 1);
                } catch (error) {
                    console.error('Error increasing quantity:', error);
                }
            } else {
                cartLocalStorageUtils.incQuantityOfProduct(productId);
                setCartQuantity(cartQuantity + 1)
            }
        } else {
            toast.error(`There are only ${product.quantity} items available for purchase`);
        };
    }
    const decreaseQuantity = async (productId: string) => {
        if (cartQuantity > 1) {
            if (userInfo) {
                try {
                    setCartQuantity(cartQuantity - 1);
                    await cartsAPI.updateQuantity(productId, 'dec');
                } catch (error) {
                    console.error('Error decreasing quantity:', error);
                }
            } else {
                if (cartQuantity > 1) {
                    cartLocalStorageUtils.decQuantityOfProduct(productId);
                    setCartQuantity(cartQuantity - 1);
                }
            }
        } else {
            toast.error('Quantity cannot be less than 1');
        }
    };
    

        const deleteFromCart = async (productId: string) => {

            await removeFromCart(productId);

        }
        return (<>
            <CardContent >
                <div>

                    <Button variant="outlined" onClick={() => decreaseQuantity(product._id)}>
                        -
                    </Button>
                    <Typography variant="body1">{cartQuantity}</Typography>
                    <Button variant="outlined" onClick={() => increaseQuantity(product._id)}>
                        +
                    </Button>
                    <Button variant="outlined" onClick={() => deleteFromCart(product._id)}>
                        Delete from Cart
                    </Button>
                </div>
                <Typography variant="body1">{product.category}</Typography>
                <Typography variant="body1">{product.price}</Typography>
                <Typography variant="body1">{product.name}</Typography>
                <img src={product.imgSource} alt="" />
            </CardContent>
        </>);
    };

    export default ProductCartCard;
