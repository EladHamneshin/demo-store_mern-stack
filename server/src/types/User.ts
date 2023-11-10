import CartItem from "./CartItem.js";

type User = {
    email: string,
    password: string,
    shoppingCart?: CartItem[],
}

export default User;