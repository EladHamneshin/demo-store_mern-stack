import handleApiRes from "./apiResHandler";

async function loginUser(email: string, password: string) {
    const response = await fetch("/api/users/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return await handleApiRes(response);
}
async function logoutUser() {
    const response = await fetch("/api/users/auth/logout", { method: "POST" });
    return await handleApiRes(response);
}

async function getUser() {
    const response = await fetch("/api/users/");
    return await handleApiRes(response);
}

async function register(email: string, password: string) {
    const response = await fetch("/api/users/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return await handleApiRes(response);
}


export default { loginUser, logoutUser, getUser , register}