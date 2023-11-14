import { useContext } from "react";
import UserInfo from "../types/UserInfo";
import {UserContext} from "../UserContext";

const useAuth = () => {
    const context = useContext(UserContext)!;
    const { userInfo, setUserInfo } = context

    const login = (user: UserInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setUserInfo(user)
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(undefined);
    };

    return { userInfo, login, logout };
};

export {useAuth};