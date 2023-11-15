import  { useState, useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import ProductCartCard from '../components/ProductCartCard';
import cartsAPI from '../api/cartsAPI';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import Cart from '../types/Cart';

const CartPage = () => {
    const [cart, setCart] = useState<null | Cart>(null);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();
    const [totalAmount, setTotalAmount] = useState<number>(0);


    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (userInfo) {
                    const cartData = await cartsAPI.getCart();

                    setCart(cartData);
                } else {
                    const localCart = localStorage.getItem('cart');
                    console.log(localCart);
                    
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

    useEffect(() => {
        if (cart) {
            const total = cart.items.reduce((sum, item) => {
                return sum + item.quantity * item.product_id.price;
            }, 0);
            setTotalAmount(total);
        }
    }, [cart]);

    const removeFromCart = async (productId: string) => {
        try {
            const updateCart = await cartsAPI.deleteProductFromCart(productId);            
            setCart(updateCart);
            toast.success('Product removed from cart');
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Error removing product from cart');
        }
    };

    const buyNow = async () => {
        console.log('Product purchased!');
        alert(`Total Amount: ${totalAmount}`);
        const newCart = await cartsAPI.deleteCart()
        
        
        setCart(newCart)
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (cart === null || cart.items.length === 0) {
        return <Typography variant="h2">No items in the cart</Typography>;
    }

    return (
        <Stack spacing={0} height={100}>
            <Typography variant="h2" component="h2">
                Cart Page
            </Typography>
            {cart.items.map((item, index) => (
                <ProductCartCard
                    key={'ProductCartCard-' + index}
                    product={item.product_id}
                    quantity={item.quantity}
                    removeFromCart={removeFromCart}
                />
            ))}
            <Button variant="contained" onClick={buyNow}>
                Buy Now {totalAmount}
            </Button>
        </Stack>
    );
};

export default CartPage;
