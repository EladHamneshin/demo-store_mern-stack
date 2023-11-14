import { useState } from "react";
import UserInfo from "../types/UserInfo";

const useAuth = () => {
    const [userInfo, setUser] = useState(
    localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : undefined);

    const login = (user: UserInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setUser(user)
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(undefined);
    };

    return { userInfo, login, logout };
};

export {useAuth};