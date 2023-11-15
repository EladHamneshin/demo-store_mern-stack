import handleApiRes from "./apiResHandler";


async function getCart() {
    const response = await fetch('/api/users/cart');
    return await handleApiRes(response);
}

async function addToCart(pid: string, quantity: string) {
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

async function updateQuantity(pid: string, action : "inc" | "dec") {
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

async function deleteProductFromCart(pid: string,) {
    const response = await fetch(`/api/users/cart/${pid}`, {method: "DELETE"});
    const data = await handleApiRes(response);
    return data
}

async function deleteCart() {
    const response = await fetch(`/api/users/cart`, {method: "DELETE"});
    const emptyCart = await response.json()
    return emptyCart
}

export default { getCart, addToCart, updateQuantity, deleteProductFromCart, deleteCart }