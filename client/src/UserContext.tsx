import React, { createContext, useState } from 'react';
import UserInfo from './types/UserInfo';


interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: UserInfo | undefined;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
    mode: 'dark' | 'light';
    setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const initialUserInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : undefined

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(initialUserInfo);
    const [mode, setMode] = useState<'dark' | 'light'>('light');

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, mode, setMode }}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;