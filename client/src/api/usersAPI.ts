async function loginUser(email: string, password: string) {
    const response = await fetch("/api/users/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    console.log(user);

    return user
}
async function logoutUser() {
    const response = await fetch("/api/users/auth/logout", { method: "POST" });
    const status = await response.json();
    console.log(status.message);
}

async function getUser() {
    const response = await fetch("/api/users/");
    const user = await response.json();
    console.log(user);
    return user
}

async function register(email: string, password: string) {
    const response = await fetch("/api/users/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    console.log(user);
    return user
}


export default { loginUser, logoutUser, getUser , register}