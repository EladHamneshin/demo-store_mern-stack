import UserInfo from "../types/UserInfo";
import handleApiRes from "./apiResHandler";

async function loginUser(email: string, password: string): Promise<UserInfo> {
    const response = await fetch("/api/users/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return await handleApiRes(response);
}

async function logoutUser(): Promise<{message:string}> {
    const response = await fetch("/api/users/auth/logout", { method: "POST" });
    return await handleApiRes(response);
}

async function getUser(): Promise<UserInfo> {
    const response = await fetch("/api/users/");
    return await handleApiRes(response);
}

async function register(email: string, password: string):Promise<UserInfo> {
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