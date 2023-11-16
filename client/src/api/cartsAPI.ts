import Cart from "../types/Cart";
import handleApiRes from "./apiResHandler";


async function getCart(): Promise<Cart> {
    const response = await fetch('/api/users/cart');
    return await handleApiRes(response);
}

async function addToCart(pid: string, quantity: string): Promise<Cart> {

    const response = await fetch(`/api/users/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: pid,
            quantity: quantity
        }),
    });    
    return await handleApiRes(response);
}

async function updateQuantity(pid: string, action : "inc" | "dec"):Promise<Cart> {
    
    const response = await fetch(`/api/users/cart`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pid: pid,
            action: action
        }),
    });

    return await handleApiRes(response);
}

async function deleteProductFromCart(pid: string):Promise<Cart> {
    const response = await fetch(`/api/users/cart/${pid}`, {method: "DELETE"});
    const data = await handleApiRes(response);
    return data
}


async function deleteCart():Promise<Cart> {
    const response = await fetch(`/api/users/cart`, {method: "DELETE"});
    return await handleApiRes(response);
}

export default { getCart, addToCart, updateQuantity, deleteProductFromCart, deleteCart }