import React, { createContext, useState } from 'react';
import UserInfo from './types/UserInfo';


interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: UserInfo | undefined;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
    mode: 'dark' | 'light';
    changeMode: () => void;
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

    const changeMode = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
        localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark');
    };

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, mode, changeMode }}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;