import React, { useState, useEffect } from 'react';
import cartsAPI from '../api/cartsAPI';
import ProductCartCard from '../components/ProductCartCard';
import Cart from '../types/Cart';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../hooks/useAuth';

function CartPage() {
    const [cart, setCart] = useState<null | Cart>(null);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (userInfo) {
                    const cartData = await cartsAPI.getCart();
                    setCart(cartData);
                } else {
                    const localCart = localStorage.getItem('cart');
                    if (localCart) {
                        const localCartData = JSON.parse(localCart);
                        setCart(localCartData);
                    } else {
                        setCart(null);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (cart === null || cart.items.length === 0) {
        return <Typography variant="h2">No items in the cart</Typography>;
    }

    const buyNow = () => {
        console.log("Product purchased!");
    };

    return (
        <Stack spacing={0} height={100}>
            <Typography variant="h2" component="h2">CartPage</Typography>
            {cart.items.map((item, index) => (
                <ProductCartCard key={'ProductCartCard-' + index} product={item.product_id} quantity={item.quantity} />
            ))}
            <Button variant="contained" onClick={buyNow}>Buy Now</Button>
        </Stack>
    );
}

export default CartPage;
