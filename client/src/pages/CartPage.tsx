import React, { useState, useEffect } from 'react';
import cartsAPI from '../api/cartsAPI';
import ProductCartCard from '../components/ProductCartCard';
import Cart from '../types/Cart';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CartPage() {
    const [cart, setCart] = useState<null | Cart>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await cartsAPI.getCart();
                setCart(cartData);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    if (!cart) {
        return <div>Loading...</div>;
    }

    const buyNow = () => {
        console.log("Product purchased!");
    };

    return (
        <Stack  spacing={0}>
            <Typography variant="body1">CartPage</Typography>
            {cart.items.map((item, index) => (
                <ProductCartCard key={'ProductCartCard-' + index} product={item.product_id} quantity={item.quantity} />
            ))}
            <Button variant="contained" onClick={buyNow}>Buy Now</Button>
        </Stack>
    );
}

export default CartPage;
