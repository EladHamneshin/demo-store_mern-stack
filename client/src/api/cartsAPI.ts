async function getCart() {
    const response = await fetch("/api/users/cart ");
    const cart = await response.json();
    console.log(cart);
    return cart
}

async function addToCart(pid: string, quantity: string) {
    const response = await fetch(`/api/users/cart`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: pid,
            quantity: quantity
        }),
    });

    const cart = await response.text();
    console.log(cart);

    return cart;
}
async function updateQuantity(pid: string, action : "inc" | "dec") {
    const response = await fetch(`/api/users/cart`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: pid,
            action: action
        }),
    });

    const cart = await response.text();
    return cart;
}

async function deleteProductFromCart(pid: string,) {
    const response = await fetch(`/api/users/cart/${pid}`, {method: "DELETE"});
    const newCart = await response.json()
    return newCart
}
async function deleteCart() {
    const response = await fetch(`/api/users/cart`, {method: "DELETE"});
    const emptyCart = await response.json()
    return emptyCart
}

export default { getCart, addToCart, updateQuantity, deleteProductFromCart, deleteCart }