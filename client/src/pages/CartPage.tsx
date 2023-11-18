import { useState, useEffect, useContext } from 'react';
import { Typography, Button, Box, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import ProductCartCard from '../components/ProductCartCard';
import cartsAPI from '../api/cartsAPI';
import CircularProgress from '@mui/material/CircularProgress';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import CartItem from '../types/CartItem';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { UserContext } from '../UserContext';

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(UserContext)!;
    const { userInfo} = context
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
            setCartItems([]);
            alert(`Total Amount: $ ${totalAmount.toFixed(3)}`);
        }
    };

    const updateCartItemQuantity = (productId: string, newQuantity: number) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.product_id._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );

        const total = cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.product_id.price;
        }, 0);
        setTotalAmount(total);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return <Typography variant="h2">No items in the cart</Typography>;
    }

    return (
        <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center' }}>
    <Grid item xs={8}>
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
                updateCartItemQuantity={updateCartItemQuantity}
            />
        ))}
    </Grid>
    <Grid item xs={4}>
        <Paper sx={{ padding: '16px', overflow: 'auto', maxHeight: '70vh', minHeight: '70vh', position: 'fixed', top: '65%', right: '0', transform: 'translateY(-50%)' }}>
            <List>
                <ListItem>
                    <ListItemText primary={`Number of Items: ${cartItems.length}`} />
                </ListItem>
                {cartItems.map((item, index) => (
                    <ListItem key={`ListItem-${index}`}>
                        <ListItemText
                            primary={item.product_id.name}
                            secondary={`Quantity: ${item.quantity} | Total Price: $${(item.quantity * item.product_id.price).toFixed(3)}`}
                        />
                        <img src={item.product_id.imageUrl} alt={item.product_id.name} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '1rem' }} />
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText primary="Total Amount" />
                    <Typography variant="h5" sx={{ marginLeft: '1rem' }}>
                        ${totalAmount.toFixed(3)}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Button variant="contained" onClick={buyNow}>
                        Buy Now
                    </Button>
                </ListItem>
            </List>
        </Paper>
    </Grid>
</Grid>
    );
};

export default CartPage;
