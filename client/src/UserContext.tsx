import React, { createContext, useState } from 'react';
import UserInfo from './types/UserInfo';
import usersAPI from './api/usersAPI';


interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: UserInfo | undefined;
    login: (email: string, password: string) => Promise<UserInfo>;
    logout: () => Promise<void>;
    mode: 'dark' | 'light';
    changeMode: () => void;
    productsInCart: number;
    setProductsInCart: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const initialUserInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : undefined

    const initialMode = localStorage.getItem('mode')?
        localStorage.getItem('mode')! : 'light';

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(initialUserInfo);
    const [mode, setMode] = useState<'dark' | 'light'>(initialMode as 'dark' | 'light');
    const [productsInCart, setProductsInCart] = useState<number>(0);

    const changeMode = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
        localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark');
    };

    const login = async (email: string, password: string) => {
        const loggedUser = await usersAPI.loginUser(email, password);
        localStorage.setItem('userInfo', JSON.stringify(loggedUser));
        setUserInfo(loggedUser);
        return loggedUser;
    }

    const logout = async () => {
        await usersAPI.logoutUser();
        localStorage.removeItem('userInfo');
        setUserInfo(undefined);
    }

    return (
        <UserContext.Provider value={{ userInfo, logout, login, mode, changeMode, productsInCart, setProductsInCart }}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;