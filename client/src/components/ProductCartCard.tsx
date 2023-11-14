import React, { useState } from 'react';
import { styled, Button, Typography, Card, CardContent } from '@mui/material';
import cartsAPI from '../api/cartsAPI';
import { toast } from 'react-toastify';
import Product from '../types/Product';

type Props = {
    product: Product;
    quantity: number;
    removeFromCart: (productId: string) => void; // הוספת הפרופ החדש להעברת הפונקציה
};

const ProductCartCard = ({ product, quantity, removeFromCart }: Props) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);

    const StyledCard = styled(Card)({
        backgroundColor: '#fff',
        borderRadius: 4,
        width: '80%',
    });

    const increaseQuantity = async (productId: string) => {
        try {
            if (cartQuantity < product.quantity) {
                await cartsAPI.updateQuantity(productId, 'inc');
                setCartQuantity(cartQuantity + 1);
            } else {
                toast.error(`There are only ${product.quantity} items available for purchase`);
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const decreaseQuantity = async (productId: string) => {
        try {
            if (cartQuantity > 0) {
                setCartQuantity(cartQuantity - 1);
                await cartsAPI.updateQuantity(productId, 'dec');
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const deleteFromCart = async (productId: string) => {
        
            removeFromCart(productId);
        
    };

    return (
        <StyledCard className="productCartCard">
            <CardContent>
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
        </StyledCard>
    );
};

export default ProductCartCard;
