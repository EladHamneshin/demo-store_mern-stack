import { useState } from "react";
import Product from "../types/Product";
import { styled } from "@mui/system";
import { Button, Typography, Card, CardContent } from "@mui/material";

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

  const increaseQuantity = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  const deleteFromCart = () => {
    console.log("Product deleted from cart");
  };

  return (
    <StyledCard className="productCartCard">
      <CardContent>
        <div>
          <Button variant="outlined" onClick={decreaseQuantity}>
            -
          </Button>
          <Typography variant="body1">{cartQuantity}</Typography>
          <Button variant="outlined" onClick={increaseQuantity}>
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
