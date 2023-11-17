import { useState, useEffect } from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import ProductCartCard from '../components/ProductCartCard';
import cartsAPI from '../api/cartsAPI';
import { useAuth } from '../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import CartItem from '../types/CartItem';
import { toastError, toastSuccess } from '../utils/toastUtils';

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (userInfo) {
                    const cartData = await cartsAPI.getCart();
                    setCartItems(cartData.items);
                } else {
                    const localCart = cartLocalStorageUtils.getCart();

                    if (localCart) {
                        setCartItems(localCart);
                    } else {
                        setCartItems([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userInfo]);

    useEffect(() => {
        if (cartItems.length !== 0) {
            const total = cartItems.reduce((sum, item) => {
                return sum + item.quantity * item.product_id.price;
            }, 0);
            setTotalAmount(total);
        }
    }, [cartItems]);


    const removeFromCart = async (productId: string) => {
        try {
            if (userInfo) {
                const updateCart = await cartsAPI.deleteProductFromCart(productId);
                setCartItems(updateCart.items);
            } else {
                const updateCart = cartLocalStorageUtils.removeFromCart(productId);
                const newCart = cartLocalStorageUtils.getCart();
                setCartItems(newCart);
            }
            toastSuccess('Product removed from cart');
        } catch (error) {
            console.error('Error removing from cart:', error);
            toastError('Error removing product from cart');
        }
    };

    const buyNow = async () => {
        if (userInfo) {
            console.log('Product purchased!');
            alert(`Total Amount: ${totalAmount.toFixed(3)}`);
            const newCart = await cartsAPI.deleteCart();
            setCartItems(newCart.items);
        } else {
            cartLocalStorageUtils.clearCart();
            setCartItems([])
            alert(`Total Amount: $ ${totalAmount.toFixed(3)}`);

        };
    }
    if (loading) {
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;
    }

    if (cartItems.length === 0) {
        return <Typography variant="h2">No items in the cart</Typography>;
    }

    return (
        <>
        <Stack spacing={0} height={100}>

            <Typography variant="h2" component="h2">
                Cart Page
            </Typography>
            {cartItems.map((item, index) => (
                <ProductCartCard
                    key={'ProductCartCard-' + index}
                    product={item.product_id}
                    quantity={item.quantity}
                    removeFromCart={removeFromCart}
                    totalAmount={totalAmount}
                    setTotalAmount={setTotalAmount}
                />
            ))}
            <Button variant="contained" onClick={buyNow}>
                Buy Now  $ {totalAmount.toFixed(3)}
            </Button>
        </Stack>
        </>
    );
};

export default CartPage;
