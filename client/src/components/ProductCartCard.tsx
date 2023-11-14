import { useState } from "react";
import Product from "../types/Product";
import { styled } from "@mui/system";
import { Button, Typography, Card, CardContent } from "@mui/material";
import cartsAPI from '../api/cartsAPI';
import { toast } from "react-toastify";

type Props = {
    product: Product;
    quantity: number;
};

const ProductCartCard = ({ product, quantity }: Props) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity);

    const StyledCard = styled(Card)({
        backgroundColor: "#fff",
        borderRadius: 4,
        width: "80%",
    });

    const increaseQuantity = (pid: string): React.MouseEventHandler<HTMLButtonElement> => () => {
        if (cartQuantity <= product.quantity  ) {
            setCartQuantity(cartQuantity + 1);
            cartsAPI.updateQuantity(pid, "inc");
        }else{
            toast.error(`There are only items ${product.quantity} available for purchase`)
        }

    };

    const decreaseQuantity = (pid: string): React.MouseEventHandler<HTMLButtonElement> => () => {
        if (cartQuantity > 0) {
            setCartQuantity(cartQuantity - 1);
            cartsAPI.updateQuantity(pid, "dec");
        }
    };

    const deleteFromCart = () => {
        console.log("Product deleted from cart");
    };

    return (
        <StyledCard className="productCartCard">
            <CardContent>
                <div>
                    <Button variant="outlined" onClick={decreaseQuantity(product._id)}> - </Button>          <Typography variant="body1">{cartQuantity}</Typography>
                    <Button variant="outlined" onClick={increaseQuantity(product._id)}>
                        +
                    </Button>
                    <Button variant="outlined" onClick={deleteFromCart}>
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
