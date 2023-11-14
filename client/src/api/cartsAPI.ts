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
    console.log(cart);

    return cart;
}



export default { getCart, addToCart, updateQuantity }